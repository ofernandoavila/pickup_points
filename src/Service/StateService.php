<?php

namespace Ofernandoavila\Pickup\Service;

use Ofernandoavila\Pickup\Core\Container;
use Ofernandoavila\Pickup\Core\Service;
use Ofernandoavila\Pickup\Repository\StateRepository;

class StateService extends Service {
    public function __construct(
        private Container $container
    ) { parent::__construct($this->container->resolve(StateRepository::class)); }
}