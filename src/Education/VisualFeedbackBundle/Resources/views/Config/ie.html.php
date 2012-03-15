<style>
body {
  
  font-family: Courier;
  font-size: 12pt;
  text-align: center;
  color: #FFFFFF;
  
  background-color: #0000AA;
}

.blue-screen {
  width: 100%;
  display: inline-block;
  
  text-align: center;
}

.blue-screen .title {
  margin: 100px 0px 0px 0px;
  padding: 2px 0px;
  width: 100px;
  display: inline-block;
  
  font-weight: bold;
  color: #0000AA;
  
  background-color: #FFFFFF;
}

.blue-screen .error {
  width: 800px;
  display: inline-block;
  text-align: left;
}


.blue-screen .suggestion {
  width: 800px;
  display: inline-block;
  text-align: left;
}

</style>

<div class="blue-screen">
  <div class="title">IExplorer</div>
  <br />
  <br />
  <br />
  <div class="error">
    An exception <?=sprintf('%03d', rand(1,256))?> has occurred at 
    <?=sprintf('%04d:%s', rand(1,9999), strtoupper(substr(md5(rand(1,9999)), 1, 8)))?> in VxD 
    IExplorer(<?=sprintf('%02d', rand(1,10))?>) + <?=sprintf('%08d', rand(0,99999999))?>. 
    This was called from <?=sprintf('%04d:%s', rand(1,9999), strtoupper(substr(md5(rand(1,9999)), 1, 8)))?> in 
    VxD IExplorer(<?=sprintf('%02d', rand(1,10))?>) + <?=sprintf('%08d', rand(0,99999999))?>. 
    It is not possible to continue.
  </div>
  <br />
  <br />
  <br />
  <div class="suggestion">
    <div class="line">
      <span class="marker">*</span> 
      <span class="text">User a different web browser to continue.</span>
    </div>
    <div class="line">
      <span class="marker">*</span> 
      <span class="text">
        Press CTRL+ALT+RESET to restart your computer. You will lose any unsaved 
        information in all applications.
      </span>
    </div>
  </div>
  <br />
  <br />
  <br />
  <div class="continue">You can't continue using this browser</div>
 </div>
