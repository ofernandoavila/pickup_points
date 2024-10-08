<?php

namespace Ofernandoavila\Pickup\Core;

class Repository {
    public string $table_name;
    public $db;

    public function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;
    }
    
    public function getAll() {
        return $this->db->get_results("SELECT * FROM $this->table_name;");
    }

    public function getById(int $id) {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE `id` = $id;")[0];
    }
}