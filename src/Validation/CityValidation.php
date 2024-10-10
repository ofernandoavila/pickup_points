<?php

namespace Ofernandoavila\Pickup\Validation;

use Ofernandoavila\Pickup\Trait\RequestHandleTrait;
use WP_REST_Request;

class CityValidation
{
   use RequestHandleTrait;

   public function on_create_validation(WP_REST_Request $request)
   {
      $data = $this->get_body_content($request);
      $errors = [];

      if (!isset($data['label'])) {
         $errors["label_error"] = "The field label cannot be empty";
      }

      if (!isset($data['state_id'])) {
         $errors["state_error"] = "The field state cannot be empty";
      } else if (isset($data['state_id']) && !is_int($data['state_id'])) {
         $errors["state_error"] = "The field state_id must be a integer";
      }

      return sizeof($errors) > 0 ? $this->send_error('', $errors) : true;
   }
}
