<?php

namespace Ofernandoavila\Pickup\Service;

use Ofernandoavila\Pickup\Repository\CityRepository;
use Ofernandoavila\Pickup\Repository\StateRepository;
use WP_REST_Request;

class CityService {
    public function __construct(
        protected CityRepository $repository
    ) { }

    public function getAllCities($filter) {
        return $this->repository->getAll($filter);
    }

    public function save($data) {
        return $this->repository->save($data);
    }
}