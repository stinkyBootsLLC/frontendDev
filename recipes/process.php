<?php
///// get all the post data
    $fields = array();
    $values = array();
    foreach($_POST as $field => $value) {
        $fields[] = $field;
        $values[] = $value;
    }// end foreach
    $post_results = array_combine($fields, $values);
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