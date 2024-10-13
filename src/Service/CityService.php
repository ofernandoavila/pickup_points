<?php

namespace Ofernandoavila\Pickup\Service;

use Ofernandoavila\Pickup\Core\Service;
use Ofernandoavila\Pickup\Core\Container;
use Ofernandoavila\Pickup\Repository\CityRepository;

class CityService extends Service {
    public function __construct(
        private Container $container
    ) { parent::__construct($this->container->resolve(CityRepository::class)); }
}