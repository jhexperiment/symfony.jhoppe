/**
 * Copyright (c) 2010 Marc McIntyre
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function($)
{
	$.fn.pureUploader = function(settings)
	{
		settings = (settings) || {};
		var uploadAverage = settings.uploadAverageSpeed || true;
		var sizeLimit = settings.sizeLimit || (2 * 1024 * 1024); // 2MB
		var url = settings.url || 'upload.php';
		
		var pureElement, uploadButton, fileMap = {}, elemMap = {}, fileId = 0;
		return this.each(function()
		{
			pureElement = this;
			$(pureElement).addClass('pure');
			uploadButton = $('<div class="pure-upload-button">Upload Files</div>').appendTo(pureElement);
			
			/**
			 * Creates the required form elements for the upload and adds
			 * the change events on the input box.
			 */
			function createFormElements()
			{
				var form = $('<form id="pure-form-' + fileId + '" target="pure-frame-' 
						+ fileId + '" enctype="multipart/form-data" action="' + url + '"' + 
						' method="POST"></form>"').appendTo(pureElement);
				var fileInput = $('<input class="pure-input" type="file" multiple="multiple"/>').appendTo(form);
			
				$(fileInput).change(function()
				{
					if (html5UploadSupported())
					{
						for (var i = 0, l = this.files.length; i < l; ++i)
						{
							uploadFileViaXHR(this.files[i]);
						}
					}
					else
					{
						uploadFileViaIframe();
					}
				});
			}
			
			// Create the initial form elements, more might be needed for non
			// HTML 5 browsers.
			createFormElements();
			
			/**
			 * Converts the specified bytes into a human readable format. Example
			 * 1KB, 2MB, 3GB, 4TB.
			 * 
			 * @param int bytes the bytes to convert.
			 * @return String the convert human readable size.
			 */
			function bytesHumanReadable(bytes)
			{
				var units = ['B', 'KB', 'MB', 'GB', 'TB'];
				
				var i = 0;
				while (bytes >= 1024)
				{
					bytes = bytes / 1024;
					i++;
				}
				return Math.round(bytes) + ' ' +  units[i];
			}
			
			/**
			 * Returns the remaining time in readable format. 
			 * 
			 * @param int speed The current speed in bytes/seconds
			 * @param int sizeRemaining The remaining upload size;
			 */
			function remainingTimeReadable(speed, sizeRemaining)
			{
				if (speed == 0)
				{
					return 'Unknown time remaining';
				}

				var seconds = Math.round(sizeRemaining / speed);
				var str = '';
				if (seconds < 60)
				{
					str = (seconds == 1) ? '1 second' : seconds + ' seconds';
				}
				else if (seconds >= 60 && seconds < 3600)
				{
					var minutes = Math.round(seconds / 60);
					str = (minutes == 1) ? 'a minute' : minutes  + ' minutes';
				}
				else
				{
					var hours = Math.round(seconds / 3600);
					str = (hours == 1) ? 'an hour' : hours  + ' hours';
				}
				return str + ' remaining';
			}

			/**
			 * Adds an entry to the fileMap for the specified filename.
			 * 
			 * @param String filename The filename to add.
			 * @return The id of the element of the file entry.
			 */
			function addEntry(filename)
			{
				if (fileMap[filename])
				{
					alert('An upload with that filename is already in progress.');
					return false;
				}
				var elemId = 'pure-id-' + fileId;
				fileMap[filename] = elemId;
				elemMap[elemId] = filename;

				fileId++;
				
				return elemId;
			}
			
			/**
			 * Deletes the entry from the internal maps.
			 * 
			 * @param String elemId The element Id to delete.
			 */
			function deleteEntry(elemId)
			{
				var filename = elemMap[elemId];
				delete elemMap[elemId];
				delete fileMap[filename];
			}
			
			/**
			 * Creates an element to display the upload.
			 * 
			 * @param String elemId The id of the upload entry.
			 * @param XMLHttpRequest xhr The XMLHttpRequest for this upload.
			 * @param String filename The name of the file to upload.
			 * @param int bytes the bytes to convert.
			 * @return String the convert human readable size.
			 */
			function createEntry(elemId, xhr, filename, size)
			{
				var entry = $('<div id="' + elemId + '" class="pure-entry"></div>').appendTo(pureElement);
				size = (size) ? ' of ' + bytesHumanReadable(size) : '';
				
				var infoDiv = '<div class="pure-info">' +
								'<span class="pure-filename">' + filename + '</span>' + 
								'<div><span class="pure-upload-progress"></span>' + 
								'<span class="pure-size">' + size + '</span>' + 
								'<span class="pure-percent"></span>' + 
								'<span class="pure-remaining-time"></span></div>' + 
							  '</div>';
				
				$(infoDiv).appendTo(entry);
				$('<div class="pure-bar-cont"><div class="pure-progress"><div class="pure-bar"></div></div>').appendTo(entry);
				$('<div class="pure-speed"></div>').appendTo(entry);
				
				// You can only cancel XHR requests.
				var cancel = $('<div class="pure-cancel"></div>');
				cancel.appendTo('#' + elemId + ' .pure-bar-cont');
				
				cancel.click(function() 
				{
					if (xhr == null || xhr.readyState == 4)
					{
						$('#' + elemId).fadeOut().remove();
					}
					else
					{
						xhr.abort();
						xhr = null;
						this.cancelled = true;
					}
				});
			}

			/**
			 * Returns the speed of the upload in bytes/s. If uploadAverage is
			 * true, the average speed for the overall download will be returned, 
			 * otherwise the speed since the last invocation of this method will
			 * be returned.
			 * 
			 * @param String elemId The id of the upload entry.
			 * @param Event e The event given to the onprogress callback.
			 * @return Integer The speed in bytes.
			 */
		    function getUploadSpeed(elemId, e)
		    {
		    	var elem = $('#' + elemId)[0];
		    	var pos = elem.position;
		    	var now = new Date().getTime();
		    	var speed = 0;

		    	if (pos)
		    	{
		    		// Convert this to seconds.
		    		var elapsed = (now - elem.now) / 1000;
		    		var uploaded = (uploadAverage) ? e.position : e.position - pos;
		    		speed = uploaded / elapsed;
		    	}
		    	
		    	elem.now = (!pos || !uploadAverage) ? now : elem.now;
		    	elem.position = e.position;

		    	return speed;
		    }
			
		    /**
		     * Called when the upload begins.
		     * 
		     * @param String elemId The id of the upload entry.
		     * @param XMLHttpRequest xhr The XMLHttpRequest for this upload.
		     * @param String filename The name of the file to upload.
		     * @param int size The size of the file to upload.
		     * 
		     * @param Event e The event given to the onprogress callback.
		     */
		    function onUploadBegin(elemId, xhr, filename, size)
			{
				createEntry(elemId, xhr, filename, size);
				$('#' + elemId + ' .pure-upload-progress').text('0');
				$('#' + elemId + ' .pure-percent').text(' (0%)');
			}
		    
		    /** 
		     * Sets the upload progress in the file entry for this upload.
		     * 
		     * @param String elemId The id of the upload entry.
		     * @param Event e The event given to the onprogress callback.
		     */
			function onUploadProgress(elemId, e)
			{
				var speed = getUploadSpeed(elemId, e);
				var progress = bytesHumanReadable(e.position);
				var percentComplete = Math.round((e.position / e.totalSize) * 100);
				var remainingTime = remainingTimeReadable(speed, e.totalSize - e.position);

				$('#' + elemId + ' .pure-bar').width(percentComplete + '%');
				$('#' + elemId + ' .pure-speed').text('Uploading at ' + bytesHumanReadable(speed) + '/s');
				$('#' + elemId + ' .pure-upload-progress').text(progress);
				$('#' + elemId + ' .pure-percent').text(' (' + percentComplete + '%)');
				$('#' + elemId + ' .pure-remaining-time').text(' - ' + remainingTime);
			}
			
			/**
			 * Completes the upload. 
			 * 
			 * @param String elemId The id of the upload entry.
		     * @param Event e The event given to the onprogress callback.
		     */
			function onUploadComplete(elemId, e)
			{
				completeEntry(elemId, 'complete', 'Done');
			}
			
			/**
			 * Called when there is an error in the XHR request.
			 * 
			 * @param String elemId The id of the upload entry.
		     * @param Event e The event given to the onprogress callback.
		     */
			function onUploadError(elemId, e)
			{
				completeEntry(elemId, 'error', 'An Error Occurred');
			}
			
			/**
			 * Called when the user aborts the upload.
			 * 
			 * @param String elemId The id of the upload entry.
		     * @param Event e The event given to the onprogress callback.
		     */
			function onUploadAbort(elemId, e)
			{
				completeEntry(elemId, 'aborted', 'Cancelled');
			}
			
			/**
			 * Set the entry to complete with the specified class and message, 
			 * successful or otherwise.
			 * 
			 * @param String elemId The id of the upload entry.
			 * @param String className The class name to add to the progress bar.
			 * @param String message The message to display, e.g Cancelled, Done.
			 */
			function completeEntry(elemId, className, message)
			{
				$('#' + elemId).addClass(className);
				$('#' + elemId + ' .pure-speed').text(message); // Message down the bottom.
				$('#' + elemId + ' .pure-remaining-time').text('');
				$('#' + elemId + ' .pure-upload-progress').text('');
				$('#' + elemId + ' .pure-percent').text('');
				$('#' + elemId + ' .pure-size').text('');
				deleteEntry(elemId);
			}
			
			/**
			 * Creates an iframe used for non HTML5 uploads.
			 */
			function createIframe(elemId , form)
			{
				var frame = $('<iframe id="' + form.target + '" name="' + 
						form.target + '" src="" class="pure-iframe" />').appendTo(form);
				frame.load(function()
				{
					onUploadComplete(elemId);
					$(frame).remove();
					$(form).remove();
					frame = null;
					form = null;
				});
			}
			
			/**
			 * Uploads the file by setting the form target to point to an iframe.
			 * Used for non HTML5 browsers.
			 */
			function uploadFileViaIframe()
			{
				var id = fileId;
				var form = $('#pure-form-' + id)[0];
				var input = $('#pure-form-' + id + ' .pure-input');
				
				var filename = input.val().replace(/^.*[\/\\]/g, '');
				var elemId = addEntry(filename);
				
				if (!elemId)
				{
					// Must be a file already in progres with this name.
					return;
				}
				
				onUploadBegin(elemId, null, filename);
				$('#' + elemId).addClass('iframe');
				createIframe(elemId, form);
				form.submit();
				$(form).hide();
				
				// Create the new form elements so that we can upload again after
				// beginning this upload.
				createFormElements();
			}
			
			/**
			 * Uploads the file via an XHR request. Used when HTML5 is present.
			 * 
			 * @param File file The file to upload, retrieved from the input.files
			 * array.
			 */
			function uploadFileViaXHR(file)
			{
				var elemId = addEntry(file.fileName);
				if (!elemId)
				{
					// Must be a file already in progres with this name.
					return;
				}
				
				var xhr = new XMLHttpRequest();
				onUploadBegin(elemId, xhr, file.fileName, file.size);
				$('#' + elemId).addClass('html5');
				
				xhr.upload.onabort = function(e) { onUploadAbort(elemId, e); };
				xhr.upload.onerror = function(e) { onUploadError(elemId, e); };
				xhr.upload.onprogress = function(e) { onUploadProgress(elemId, e); };
				xhr.onload = function(e) { onUploadComplete(elemId, e); };

				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-Type", "multipart/form-data");
				xhr.setRequestHeader("Cache-Control", "no-cache");
				xhr.setRequestHeader("Content-Type", "multipart/form-data");

				// pseudo standard fields.
		        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		        xhr.setRequestHeader("X-File-Name", file.fileName);
		        xhr.setRequestHeader("X-File-Size", file.fileSize);
				xhr.send(file);
			}
			
			/**
			 * Returns TRUE if the browser supports HTML uploads.
			 * 
			 * @return TRUE if the browser supports HTML uploads. 
			 */
			function html5UploadSupported()
			{
				if (window.XMLHttpRequest)
				{
					return (new XMLHttpRequest().upload != null);
				}
				return false;
			};
		});
	}
})(jQuery);