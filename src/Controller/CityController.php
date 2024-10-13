<?php

namespace Ofernandoavila\Pickup\Controller;

use Ofernandoavila\Pickup\Core\Container;
use Ofernandoavila\Pickup\Core\Controller;
use Ofernandoavila\Pickup\Service\CityService;

class CityController extends Controller {
    private CityService $service;
    
    public function __construct(
        protected Container $container
    ) { 
        $this->service = $this->container->resolve(CityService::class);
        parent::__construct($this->service);
    }
}