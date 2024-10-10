<?php

namespace Ofernandoavila\Pickup\Service;

use Ofernandoavila\Pickup\Repository\StateRepository;
use WP_REST_Request;

class StateService {
    public function __construct(
        protected StateRepository $repository
    ) { }

    public function getAllStates($filter) {
        if(isset($filter) && sizeof($filter) > 0) {
            return $this->repository->getByFilter($filter);
        }

        return $this->repository->getAll();
    }
}