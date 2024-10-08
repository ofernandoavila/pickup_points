<?php

namespace Ofernandoavila\Pickup\Service;

use Ofernandoavila\Pickup\Repository\PickupPointRepository;

class PickupPointService {
    protected PickupPointRepository $repository;

    public function __construct()
    {
        $this->repository = new PickupPointRepository();
    }

    public function getAllPickupPoints() {
        return $this->repository->getAll();
    }
    
    public function getAllPickupPointsActives() {
        return $this->repository->getAllPickupPointsActives();
    }
}