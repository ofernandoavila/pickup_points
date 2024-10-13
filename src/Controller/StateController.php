<?php

namespace Ofernandoavila\Pickup\Controller;

use Ofernandoavila\Pickup\Core\Container;
use Ofernandoavila\Pickup\Core\Controller;
use Ofernandoavila\Pickup\Service\StateService;

class StateController extends Controller {
    private StateService $service;
    
    public function __construct(
        protected Container $container
    ) { 
        $this->service = $this->container->resolve(StateService::class);
        parent::__construct($this->service);
    }
}