<?php

namespace Ofernandoavila\Pickup\Validation;

use Ofernandoavila\Pickup\Trait\RequestHandleTrait;
use WP_REST_Request;

class PickupPointValidation
{
   use RequestHandleTrait;

   public function on_create_validation(WP_REST_Request $request)
   {
      $data = $this->get_body_content($request);
      $errors = [];

      if (!isset($data['name'])) {
         $errors["name_error"] = "The field name cannot be empty";
      }

      if (!isset($data['address'])) {
         $errors["address_error"] = "The field address cannot be empty";
      }

      if (!isset($data['city_id'])) {
         $errors["city_error"] = "The field city cannot be empty";
      } else if (isset($data['city_id']) && !is_int($data['city_id'])) {
         $errors["cost_error"] = "The field city_id must be a integer";
      }

      if (!isset($data['state_id'])) {
         $errors["state_error"] = "The field state cannot be empty";
      } else if (isset($data['state_id']) && !is_int($data['state_id'])) {
         $errors["state_error"] = "The field state_id must be a integer";
      }

      if (!isset($data['cnpj'])) {
         $errors["cnpj_error"] = "The field cnpj cannot be empty";
      }

      if (!isset($data['deadline'])) {
         $errors["deadline_error"] = "The field deadline cannot be empty";
      } else if (isset($data['deadline']) && !is_int($data['deadline'])) {
         $errors["deadline_error"] = "The field deadline must be a integer";
      }

      if (!isset($data['cost'])) {
         $errors["cost_error"] = "The field cost cannot be empty";
      } else if (isset($data['cost']) && !is_float($data['cost'])) {
         $errors["cost_error"] = "The field cost must be a decimal";
      }

      if (!isset($data['phone'])) {
         $errors["phone_error"] = "The field phone cannot be empty";
      }

      if (!isset($data['hour'])) {
         $errors["hour_error"] = "The field hour cannot be empty";
      }

      return sizeof($errors) > 0 ? $this->send_error('', $errors) : true;
   }
}
