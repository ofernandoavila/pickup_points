<?php

namespace Ofernandoavila\Pickup\Service;

use Ofernandoavila\Pickup\Repository\PickupPointRepository;

class PickupPointService {
    public function __construct(
        protected PickupPointRepository $repository
    ) { }

    public function getAllPickupPoints($filter) {
        if(isset($filter) && sizeof($filter) > 0) {
            return $this->repository->getByFilter($filter);
        }

        return $this->repository->getAll();
    }
    
    public function getPickupPointByCNPJ(string $cnpj) {
        return $this->repository->getPickupPointByCNPJ($cnpj);
    }
    
    public function getPickupPointByID(int $id) {
        return $this->repository->getPickupPointByID($id);
    }
    
    public function getAllPickupPointsActives() {
        return $this->repository->getAllPickupPointsActives();
    }
    
    public function createPickupPoint(array $data) {
        return $this->repository->save($data);
    }
}