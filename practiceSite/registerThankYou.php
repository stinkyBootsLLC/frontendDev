<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <!-- required for different screen sizes -->
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="author" content="Eduardo Estrada">
        <meta name="description" content="description here">
        <meta name="keywords" content="keywords,here">
        <title>WindUp Dance Tour MOCK</title>
        <!-- imported styles -->
        <link href="assets/styles/fontawesome/css/all.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <!-- local styles -->
        <link href="assets/styles/site.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/styles/registration.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/styles/mobile.min.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <section class=" container reg-message">
        <h1>Thank you for Registering</h1>
        <h4>Bethlehem, PA - November 10th, 2019</h4>
        <p><em>You will now be redirected to payment</em></p>
        </section>
        <?php 
            //@TODO capture the form fields 
            echo "<script> setTimeout(function(){location.href='https://www.paypal.com/us/signin'} , 5000); </script>";
        ?>
        <!-- Boostrap requirements -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
            </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>
        <!-- Boostrap requirements -->
    </body>

</html>