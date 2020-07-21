
<?php

$target_dir = "recipeImages/";
$target_file = $target_dir . basename($_FILES["picture"]["name"]);
$imageName = basename($_FILES["picture"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["picture"]["tmp_name"]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check file size
if ($_FILES["picture"]["size"] > 500000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file)) {
    echo "The file ". basename( $_FILES["picture"]["name"]). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}












///// get all the post data
    $fields = array();
    $values = array();
    foreach($_POST as $field => $value) {
        $fields[] = $field;
        $values[] = $value;
    }// end foreach
    $post_results = array_combine($fields, $values);

    print_r ($post_results);
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

    if(file_exists('assets/db/recipes.json')){  
        // append to end of json file
        $current_data = file_get_contents('assets/db/recipes.json');  
        $array_data = json_decode($current_data, true);  
        $extra = array(  
            'id'             =>     $_POST['id'],  
            'title'          =>     $_POST["title"],  
            'description'    =>     $_POST["description"],
            'picture'        =>     $imageName,
            'ingredients'    =>     $ingredients,
            'directions'     =>     $directions
        );  

        $array_data[] = $extra;  
        $final_data = json_encode($array_data);  
        if(file_put_contents('assets/db/recipes.json', $final_data)){  
            echo "<label class='text-success'>File Appended Success fully</p>";  
        }  
    } else {  
        echo "JSON File not exits";  
    } // end if(file_exists()) 
?>

