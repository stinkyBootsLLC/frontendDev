
<?php
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
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $isImageLoaded = false;
    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
      $check = getimagesize($_FILES["picture"]["tmp_name"]);
      if($check !== false) {
      // echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
        $isImageLoaded = true;
      } else {
        echo "File is not an image.<br>";
        $uploadOk = 0;
      }
    }// end if(isset($_POST["submit"]))

    // Check if file already exists
    if (file_exists($target_file)) {
      echo "Sorry, file already exists.<br>";
      $uploadOk = 0;
      $isImageLoaded = false;
    }// end if (file_exists($target_file))

    // Check file size
    if ($_FILES["picture"]["size"] > 500000) {
      echo "Sorry, your file is too large.<br>";
      $uploadOk = 0;
      $isImageLoaded = false;
    }// end if ($_FILES["picture"]["size"] > 500000) 

    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
      echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";
      $uploadOk = 0;
      $isImageLoaded = false;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.<br>";
    // if everything is ok, try to upload file
    } else {
      if (move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file)) {
        // if the file was sucessfully uploaded
        // then do nothing right now 
      } else {
        echo "Sorry, there was an error uploading your file.<br>";
      }
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


    /**
     * Sanatize untrusted data
     * @param string - data
     * @return string - clean data
     */
    function sanatizeData($data){
      $badChars = array('!','@','#','$','%','^','&','*','(',')','{','}','[',']','|','?','.');
      $specCharData = htmlspecialchars($data);
      $cleanData = str_replace($badChars, '', $specCharData);
      return $cleanData;
    }// end sanatize data

    /**
     * Phase: Architecture and Design
     * Generate a new, unique filename for an uploaded file instead of using the 
     * user-supplied filename, so that no external input is used at all 
     * @param string - input
     * @param int - strength
     * @return string - random_name
     */
    function generate_Random_FileName($input, $strength) {
      $num = rand(1, 100 );
      $input_length = strlen($input);
      $random_name = 'img_'.' '.$num;
      for($i = 0; $i < $strength; $i++) {
        $random_character = $input[mt_rand(0, $input_length - 1)];
        $random_name .= $random_character;
      }
      //img_468dGdh
      return $random_name;
    }// end generate_Random_FileName()










?>

