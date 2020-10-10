<?php
    /**
     * Determine if the uploaded file is allowed
     * File must be image type.
     * File must be less than 5MB.
     * Only jpg,png,and jpeg allowed
     * @param string - sUpLoadedImage
     * @param int - nFileSize
     * @return bool - isImageAllowed
     */
    function isFileAllowed($sUpLoadedImage, $nFileSize){
        $isImageAllowed = true;
        $aFileInfo = getimagesize($sUpLoadedImage);
        $sFileType = $aFileInfo["mime"];
        $sFileExt = substr($sFileType, 6);
        // is file an image?
        if(substr($sFileType, 0,5) !== "image") {
            echo "Sorry, image file types only.<br>";
            $isImageAllowed = false;
        } 
        // is file to big?
        if ($nFileSize > 500000) {
            echo "Sorry, image is to large - less than 5MB only.<br>";
            $isImageAllowed = false;
        }
        // does file have correct image extension?
        if($sFileExt !== "jpg" && $sFileExt !== "png" && $sFileExt !== "jpeg") {
          echo "Sorry, only JPG, JPEG, & PNG files are allowed.<br>";
          $isImageAllowed = false;
        }
        return $isImageAllowed;

    }// end isFileImage()
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