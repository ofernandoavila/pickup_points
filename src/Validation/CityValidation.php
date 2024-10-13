<?php

namespace Ofernandoavila\Pickup\Validation;

use Ofernandoavila\Pickup\Core\Container;
use Ofernandoavila\Pickup\Repository\CityRepository;
use Ofernandoavila\Pickup\Service\CityService;
use Ofernandoavila\Pickup\Trait\RequestHandleTrait;

class CityValidation
{
   private CityRepository $repository;
   private CityService $service;

   public function __construct(
      private Container $container
   ) {
      $this->repository = $container->resolve(CityRepository::class);
      $this->service = $container->resolve(CityService::class);
   }

   use RequestHandleTrait;

   public function on_create_validation(\WP_REST_Request $request)
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

      if($this->service->checkIfExists($data)) {
         return $this->send_error('Já existe uma cidade cadastrada com este nome neste estado');
     }

      return sizeof($errors) > 0 ? $this->send_error('', $errors) : true;
   }
   
   public function on_edit_validation(\WP_REST_Request $request)
   {
      $data = $this->get_body_content($request);
      $errors = [];
      
      if (!isset($data['id'])) {
         $errors["id_error"] = "The field id cannot be empty";
      } else if (isset($data['id']) && !is_int($data['id'])) {
         $errors["id_error"] = "The field id must be a integer";
      }
      
      if (!isset($data['label'])) {
         $errors["label_error"] = "The field label cannot be empty";
      }

      $current = $this->service->getById($data['id']);

      $data['state_id'] = $current->state_id;

      if($this->service->checkIfExists($data)) {
         return $this->send_error('Já existe uma cidade cadastrada com este nome neste estado');
      }

      return sizeof($errors) > 0 ? $this->send_error('', $errors) : true;
   }
}
