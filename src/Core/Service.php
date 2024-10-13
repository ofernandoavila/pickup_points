<?php

namespace Ofernandoavila\Pickup\Core;

class Service {
    public function __construct(
        protected $repository
    ) { }

    public function save($data) {
        return $this->repository->save($data);
    }
    
    public function update($data) {
        return $this->repository->update($data);
    }

    public function getById(int $id) {
        return $this->repository->getById($id);
    }
    
    public function checkIfExists($data) {
        return $this->repository->checkIfExists($data["label"], $data['state_id']);
    }

    public function getAll($filter) {
        return $this->repository->getAll($filter);
    }
    
    public function delete(int $id) {
        return $this->repository->delete($id);
    }

    public function getCount() {
        return $this->repository->getCount();
    }
}