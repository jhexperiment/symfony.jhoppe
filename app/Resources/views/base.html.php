<!-- app/Resources/views/base.html.php -->
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?php $view['slots']->output('title', 'Visual Feedback') ?></title>
    <link rel="stylesheet" href="/bundles/visualfeedback/css/jquery/jquery-ui.css" type="text/css">
  </head>
  <body>
    <script type="text/javascript" src="/bundles/visualfeedback/js/jquery/jquery-ui.js"></script>
    <script type="text/javascript" src="/bundles/visualfeedback/js/jquery/plugins/jquery.disable.text.select.js"></script>

    <?php $view['slots']->output('_content') ?>
  </body>
</html>