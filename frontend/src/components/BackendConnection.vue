<template>
  <div class="backend-connection">
    <h2>Backend Connection Test</h2>
    
    <div class="status-section">
      <h3>Server Status</h3>
      <button @click="checkHealth" :disabled="loading">
        {{ loading ? 'Checking...' : 'Check Health' }}
      </button>
      <div v-if="healthStatus" class="status-message">
        <p><strong>Status:</strong> {{ healthStatus.status }}</p>
        <p><strong>Timestamp:</strong> {{ healthStatus.timestamp }}</p>
      </div>
    </div>

    <div class="users-section">
      <h3>Users</h3>
      <button @click="fetchUsers" :disabled="loading">
        {{ loading ? 'Loading...' : 'Fetch Users' }}
      </button>
      <div v-if="users.length > 0" class="users-list">
        <div v-for="user in users" :key="user.id" class="user-card">
          <h4>{{ user.name }}</h4>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>

    <div class="error-section" v-if="error">
      <h3>Error</h3>
      <p class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const healthStatus = ref(null)
const users = ref([])
const error = ref('')

const API_BASE = 'http://localhost:3000'

const checkHealth = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(`${API_BASE}/api/health`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    healthStatus.value = await response.json()
  } catch (err) {
    error.value = `Failed to connect to backend: ${err.message}`
  } finally {
    loading.value = false
  }
}

const fetchUsers = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(`${API_BASE}/api/users`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    users.value = await response.json()
  } catch (err) {
    error.value = `Failed to fetch users: ${err.message}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.backend-connection {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.status-section,
.users-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
}

button:hover:not(:disabled) {
  background-color: #369870;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.status-message {
  background-color: #f0f8f0;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #42b883;
}

.users-list {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}

.user-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.user-card h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.user-card p {
  margin: 0;
  color: #666;
}

.error-section {
  background-color: #ffe6e6;
  padding: 15px;
  border-radius: 4px;
  border-left: 4px solid #e74c3c;
}

.error-message {
  color: #c0392b;
  margin: 0;
}
</style>