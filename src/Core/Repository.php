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
    
    public function getAll(array $filter = []) {
        return $this->db->get_results("SELECT * FROM $this->table_name;");
    }
    
    public function getCount() {
        return intval($this->db->get_results("SELECT COUNT(*) as count FROM $this->table_name;")[0]->count);
    }

    public function getById(int $id) {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE `id` = $id;")[0];
    }

    public function uninstall() {
        return $this->db->query("DROP TABLE $this->table_name");
    }

    public function delete(int $id) {
        return $this->db->query("DELETE FROM $this->table_name WHERE `id` = $id;");
    }
}