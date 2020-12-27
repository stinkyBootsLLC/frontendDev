
<?php
  include 'siteFunctions.php';
    // allowed char for random file name
    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $target_dir = "recipeImages/";
    // get the file extension
    $file_ext = strtolower(end(explode('.', $_FILES['picture']['name'])));
    // rename the uploaded file
    $newFileName = generate_Random_FileName($permitted_chars, 5).".".$file_ext;
    // the newly created file name and dir to upload
    $target_file = $target_dir . $newFileName;
    // for the database entry
    $imageName = $newFileName;
    $uploadOk = 0;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $isImageLoaded = false;

    // if submit
    if(isset($_POST["submit"])) {
      // check if the file is allowed 
      if(isFileAllowed($_FILES["picture"]["tmp_name"], $_FILES["picture"]["size"])){
        // then 
        $uploadOk = 1;
        $isImageLoaded = true;
      }else{
        echo "File is not allowed.<br>";
      }// end if isFileAllowed
    }// end if(isset($_POST["submit"]))

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 1) {
      // then move the file into new dir w/ new name
      move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);
    } else {
        echo "Sorry, there was an error uploading your file.<br>";
        exit;
    }// end if ($uploadOk == 0) 
    /** Start building the JSON file */

    ///// get all the post data
    $fields = array();
    $values = array();
    foreach($_POST as $field => $value) {
        $fields[] = $field;
        // back-end FINAL sanitization strip everything off
        $values[] = sanatizeData($value);
    }// end foreach
    $post_results = array_combine($fields, $values);

    //print_r ($post_results);
    ///// end get all the post data
    $items = array();
    $ingredients = array();
    $steps = array();
    $directions = array();

    foreach($post_results as $field => $value) {

        ////////////////////////////////////////
        if (strstr($field, 'name_')){
            $items["name"] = $value;
        }
        if (strstr($field, 'amount_')){
            $items["amount"] = $value;
        }
        if (strstr($field, 'unit_')){
            $items["unit"] = $value;
            array_push($ingredients,$items);
        }
        /////////////////////////////////////

        if (strstr($field, 'step_')){
            $steps["Step"] = $value;
            array_push($directions,$steps);
        }
    }// end foreach($post_results as $field => $value) 
    if($isImageLoaded){
      if(file_exists('assets/db/recipes.json')){  
          // append to end of json file
          $current_data = file_get_contents('assets/db/recipes.json');  
          $array_data = json_decode($current_data, true);  
          $extra = array(  
              'id'             =>     $_POST['id'],  
              'title'          =>     $_POST["title"],  
              'description'    =>     $_POST["description"],
              'Category'       =>     $_POST["foodCategory"],    
              'picture'        =>     $imageName,
              'ingredients'    =>     $ingredients,
              'directions'     =>     $directions
          );  

          $array_data[] = $extra;  
          $final_data = json_encode($array_data);  
          if(file_put_contents('assets/db/recipes.json', $final_data)){  
              echo "<label class='text-success'>File Appended Success fully</p><br>"; 
              echo "<script> setTimeout(function () {window.location.href = 'index.html';
                }, 1000); </script>";
          }
        }else {  
            echo "JSON File not exits <br>";  
        } // end if(file_exists())
    }else{
      echo "problem with image file <br> Record NOT added";  
    }// if($isImageLoaded)


    










?>

