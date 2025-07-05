<template>
  <div class="loading-container" :class="{ 'overlay': overlay }">
    <!-- Spinner simple -->
    <div v-if="type === 'spinner'" class="spinner-wrapper">
      <div class="spinner"></div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>

    <!-- Dots animés -->
    <div v-else-if="type === 'dots'" class="dots-wrapper">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>

    <!-- Skeleton pour les cartes -->
    <div v-else-if="type === 'skeleton'" class="skeleton-wrapper">
      <div class="skeleton-cards">
        <div class="skeleton-card" v-for="n in skeletonCount" :key="n">
          <div class="skeleton-header"></div>
          <div class="skeleton-content">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pulse pour les pages -->
    <div v-else-if="type === 'pulse'" class="pulse-wrapper">
      <div class="pulse-container">
        <div class="pulse-circle"></div>
        <div class="pulse-text">
          <h3>{{ message || 'Chargement...' }}</h3>
          <p>Récupération des données</p>
        </div>
      </div>
    </div>

    <!-- Barre de progression -->
    <div v-else-if="type === 'progress'" class="progress-wrapper">
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="progress-text">{{ message || 'Chargement...' }} {{ progress }}%</p>
      </div>
    </div>

    <!-- Loading avec icône -->
    <div v-else class="icon-wrapper">
      <div class="icon-container">
        <svg class="loading-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <p v-if="message" class="loading-message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    type: {
      type: String,
      default: 'spinner',
      validator: value => ['spinner', 'dots', 'skeleton', 'pulse', 'progress', 'icon'].includes(value)
    },
    message: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    },
    skeletonCount: {
      type: Number,
      default: 3
    },
    progress: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 100
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 200px;
}

.loading-container.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  z-index: 1000;
  min-height: 100vh;
}

.loading-message {
  color: #6b7280;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}

/* Spinner */
.spinner-wrapper {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Dots */
.dots-wrapper {
  text-align: center;
}

.dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.dot {
  width: 12px;
  height: 12px;
  background: #3b82f6;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
.dot:nth-child(3) { animation-delay: 0s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Skeleton */
.skeleton-wrapper {
  width: 100%;
  max-width: 800px;
}

.skeleton-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.skeleton-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.skeleton-header {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Pulse */
.pulse-wrapper {
  text-align: center;
}

.pulse-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.pulse-circle {
  width: 60px;
  height: 60px;
  background: #3b82f6;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.pulse-text h3 {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.pulse-text p {
  color: #6b7280;
  margin: 0.5rem 0 0 0;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

/* Progress */
.progress-wrapper {
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.progress-container {
  width: 100%;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

/* Icon */
.icon-wrapper {
  text-align: center;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.loading-icon {
  width: 48px;
  height: 48px;
  color: #3b82f6;
  animation: spin 2s linear infinite;
}

/* Responsive */
@media (max-width: 640px) {
  .loading-container {
    padding: 1rem;
  }
  
  .skeleton-cards {
    grid-template-columns: 1fr;
  }
  
  .pulse-circle {
    width: 50px;
    height: 50px;
  }
  
  .pulse-text h3 {
    font-size: 1.125rem;
  }
}
</style> 