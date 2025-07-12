<!-- src/pages/HomePage.vue -->
<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8 min-w-0">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 sm:mb-8">
      {{ pageTitle }}
    </h1>

    <!-- Affichage du loading -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Chargement des données...</p>
      </div>
    </div>

    <!-- Affichage d'erreur -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h3 class="text-red-800 font-semibold">Erreur de chargement</h3>
      </div>
      <p class="text-red-700 mt-2">{{ error.message }}</p>
      <button @click="retryOperation" class="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Réessayer
      </button>
    </div>

    <!-- Affichage des cartes selon l'état individuel de chaque donnée -->
    <div v-else class="space-y-6">
      <!-- Message de bienvenue motivant -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold">Commencez votre journée !</h2>
            <p class="text-blue-100">Prenez quelques minutes pour enregistrer vos données de bien-être</p>
          </div>
        </div>
      </div>

      <!-- Grille des catégories avec design attractif -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <!-- Sleep Card -->
        <div class="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95" @click="openSleepModal">
          <!-- Si les données de sommeil existent -->
          <div v-if="individualData.sleep.hasData" class="bg-white rounded-xl shadow-md border-2 border-transparent group-hover:border-indigo-300 group-active:border-indigo-400 overflow-hidden">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 sm:p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 sm:space-x-3">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold text-base sm:text-lg">Sommeil</h3>
                    <p class="text-indigo-100 text-xs sm:text-sm">Vos heures de repos</p>
                  </div>
                </div>
                <div class="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">{{ individualData.sleep.formattedData || '-' }}</div>
                <div class="text-sm text-indigo-700 mb-2">Durée du sommeil</div>
                <span class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                  Cliquez pour voir les détails
                </span>
              </div>
            </div>
          </div>
          
          <!-- Si pas de données de sommeil -->
          <div v-else class="bg-white rounded-xl shadow-md border-2 border-transparent group-hover:border-indigo-300 group-active:border-indigo-400 overflow-hidden">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 sm:p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 sm:space-x-3">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 718.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold text-base sm:text-lg">Sommeil</h3>
                    <p class="text-indigo-100 text-xs sm:text-sm">Enregistrez vos heures de repos</p>
                  </div>
                </div>
                <div class="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div class="flex items-center justify-between">
                <span class="text-indigo-600 font-medium text-sm sm:text-base">Cliquez pour commencer</span>
                <div class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-300 rounded-full animate-pulse"></div>
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Diet Card -->
        <div class="pointer-events-none opacity-60 select-none">
          <div class="bg-white rounded-xl shadow-md border-2 border-transparent overflow-hidden">
            <div class="bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-4">
              <div class="flex items-center space-x-2 sm:space-x-3">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-semibold text-base sm:text-lg">Alimentation</h3>
                  <p class="text-green-100 text-xs sm:text-sm">Fonctionnalité arrivant prochainement</p>
                </div>
              </div>
            </div>
            <div class="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50">
              <div class="flex items-center justify-center">
                <span class="text-green-600 font-medium text-sm sm:text-base">Fonctionnalité en cours de développement</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Card -->
        <div class="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95" @click="openActivityModal">
          <div class="bg-white rounded-xl shadow-md border-2 border-transparent group-hover:border-orange-300 group-active:border-orange-400 overflow-hidden">
            <div class="bg-gradient-to-br from-orange-500 to-red-600 p-3 sm:p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 sm:space-x-3">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold text-base sm:text-lg">Activité</h3>
                    <p class="text-orange-100 text-xs sm:text-sm" v-if="individualData.activity.hasData">Vos exercices</p>
                    <p class="text-orange-100 text-xs sm:text-sm" v-else>Enregistrez vos exercices</p>
                  </div>
                </div>
                <div class="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <svg v-if="individualData.activity.hasData" class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <svg v-else class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50">
              <div class="text-center">
                <div v-if="individualData.activity.hasData">
                  <div class="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                    {{ individualData.activity.formattedData || '-' }} <span class="text-base font-normal">min</span>
                  </div>
                  <div class="text-sm text-orange-700 mb-2">Temps d'activité</div>
                  <span class="text-xs text-orange-600 hover:text-orange-800 font-medium">
                    Cliquez pour voir les détails
                  </span>
                </div>
                <div v-else class="flex items-center justify-center gap-2">
                  <span class="text-orange-600 font-medium text-sm sm:text-base">Cliquez pour commencer</span>
                  <div class="flex items-center space-x-1">
                    <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-300 rounded-full animate-pulse"></div>
                    <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-pulse delay-75"></div>
                    <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mood Card -->
        <div class="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95" @click="openMoodModal">
          <div class="bg-white rounded-xl shadow-md border-2 border-transparent group-hover:border-pink-300 group-active:border-pink-400 overflow-hidden">
            <div class="bg-gradient-to-br from-pink-500 to-purple-600 p-3 sm:p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 sm:space-x-3">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold text-base sm:text-lg">Humeur</h3>
                    <p class="text-pink-100 text-xs sm:text-sm" v-if="individualData.mood.hasData">Votre état d'esprit</p>
                    <p class="text-pink-100 text-xs sm:text-sm" v-else>Enregistrez votre humeur</p>
                  </div>
                </div>
                <div class="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <svg v-if="individualData.mood.hasData" class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <svg v-else class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-purple-50">
              <div v-if="individualData.mood.hasData" class="text-center">
                <div class="flex flex-col items-center justify-center mb-1">
                  <div class="text-4xl mb-2">🧠</div>
                  <div class="text-lg text-pink-700 font-semibold">Consultez le détail de votre humeur du jour</div>
                </div>
                <span class="text-xs text-pink-600 hover:text-pink-800 font-medium">
                  Cliquez pour voir les détails
                </span>
              </div>
              <div v-else class="flex items-center justify-between">
                <span class="text-pink-600 font-medium text-sm sm:text-base">Cliquez pour commencer</span>
                <div class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full animate-pulse"></div>
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-pulse delay-75"></div>
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message de motivation en bas -->
      <div class="text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-l-4 border-yellow-400">
        <div class="flex items-center justify-center space-x-2 mb-2">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span class="text-yellow-800 font-semibold">Conseil du jour</span>
        </div>
        <p class="text-yellow-700">
          {{ conseilAleatoire }}
        </p>
      </div>
    </div>

    <!-- Popups modales -->
    <!-- Sleep Modal -->
    <div v-if="showSleepModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" @click="closeSleepModal">
      <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 718.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">{{ isEditMode ? 'Modifier le sommeil' : 'Sommeil' }}</h2>
                <p class="text-indigo-100">{{ isEditMode ? 'Modifiez vos heures de repos' : 'Enregistrez vos heures de repos' }}</p>
              </div>
            </div>
            <button @click="closeSleepModal" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Heure de coucher <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="sleepData.bedtime" 
                type="time" 
                :class="[
                  'w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                  sleepErrors.bedtime ? 'border-red-500 bg-red-50' : 'border-gray-300'
                ]"
                @input="clearSleepErrors"
              >
              <p v-if="sleepErrors.bedtime" class="text-red-500 text-xs mt-1">{{ sleepErrors.bedtime }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Heure de réveil <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="sleepData.wakeup" 
                type="time" 
                :class="[
                  'w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                  sleepErrors.wakeup ? 'border-red-500 bg-red-50' : 'border-gray-300'
                ]"
                @input="clearSleepErrors"
              >
              <p v-if="sleepErrors.wakeup" class="text-red-500 text-xs mt-1">{{ sleepErrors.wakeup }}</p>
            </div>
          </div>
          
          <div class="text-center text-sm text-gray-500">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            La durée sera calculée automatiquement
          </div>

          <!-- Durée calculée automatiquement -->
          <div v-if="sleepDuration" class="bg-indigo-50 p-4 rounded-lg text-center">
            <h4 class="font-semibold text-indigo-800 mb-2">Durée du sommeil</h4>
            <div class="text-2xl font-bold text-indigo-600">{{ sleepDuration }}</div>
          </div>
          
          <!-- Erreur de durée -->
          <div v-if="sleepErrors.duration" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-red-600 text-sm flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ sleepErrors.duration }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Qualité du sommeil <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="quality in sleepQualities"
                :key="quality.value"
                @click="sleepData.quality = quality.value; clearSleepErrors()"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  sleepData.quality === quality.value 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : sleepErrors.quality 
                      ? 'border-red-300 hover:border-red-400'
                      : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ quality.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ quality.label }}</div>
              </button>
            </div>
            <p v-if="sleepErrors.quality" class="text-red-500 text-xs mt-2">{{ sleepErrors.quality }}</p>
          </div>

          <div class="flex space-x-3">
            <button @click="closeSleepModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveSleepData" class="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700">
              {{ isEditMode ? 'Modifier' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Diet Modal -->
    <div v-if="showDietModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" @click="closeDietModal">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">{{ isEditMode ? 'Modifier l\'alimentation' : 'Suivi Nutritionnel' }}</h2>
                <p class="text-green-100">{{ isEditMode ? 'Modifiez votre nutrition' : 'Enregistrez vos données nutritionnelles complètes' }}</p>
              </div>
            </div>
            <button @click="closeDietModal" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <!-- Erreur générale -->
          <div v-if="dietErrors.general" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-red-600 text-sm flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ dietErrors.general }}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Petit-déjeuner</label>
              <textarea v-model="dietData.breakfast" placeholder="Décrivez votre petit-déjeuner..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Déjeuner</label>
              <textarea v-model="dietData.lunch" placeholder="Décrivez votre déjeuner..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Dîner</label>
              <textarea v-model="dietData.dinner" placeholder="Décrivez votre dîner..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Collations</label>
              <textarea v-model="dietData.snacks" placeholder="Pomme avec beurre de cacahuète..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
          </div>

          <!-- Résumé nutritionnel -->
          <div class="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <h3 class="font-semibold text-green-800 mb-2">Résumé Nutritionnel <span class="text-red-500">*</span></h3>
            <p class="text-sm text-green-700 mb-4">Toutes les valeurs nutritionnelles sont obligatoires</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">
                  Calories <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    v-model="dietData.calories" 
                    type="number" 
                    min="0" 
                    placeholder="1800" 
                    required
                    :class="[
                      'w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm',
                      dietErrors.calories ? 'border-red-500 bg-red-50' : 'border-green-300'
                    ]"
                    @input="clearDietErrors"
                  >
                  <span class="absolute right-2 top-2 text-xs text-green-600">kcal</span>
                </div>
                <p v-if="dietErrors.calories" class="text-red-500 text-xs mt-1">{{ dietErrors.calories }}</p>
                <p v-if="calculatedCalories && calculatedCalories !== parseFloat(dietData.calories)" class="text-xs text-blue-600 mt-1">
                  Calculé: {{ calculatedCalories }}kcal
                </p>
              </div>
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">
                  Protéines <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    v-model="dietData.protein" 
                    type="number" 
                    min="0" 
                    placeholder="75" 
                    required
                    :class="[
                      'w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm',
                      dietErrors.protein ? 'border-red-500 bg-red-50' : 'border-green-300'
                    ]"
                    @input="clearDietErrors"
                  >
                  <span class="absolute right-2 top-2 text-xs text-green-600">g</span>
                </div>
                <p v-if="dietErrors.protein" class="text-red-500 text-xs mt-1">{{ dietErrors.protein }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">
                  Glucides <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    v-model="dietData.carbs" 
                    type="number" 
                    min="0" 
                    placeholder="200" 
                    required
                    :class="[
                      'w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm',
                      dietErrors.carbs ? 'border-red-500 bg-red-50' : 'border-green-300'
                    ]"
                    @input="clearDietErrors"
                  >
                  <span class="absolute right-2 top-2 text-xs text-green-600">g</span>
                </div>
                <p v-if="dietErrors.carbs" class="text-red-500 text-xs mt-1">{{ dietErrors.carbs }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">
                  Lipides <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input 
                    v-model="dietData.fats" 
                    type="number" 
                    min="0" 
                    placeholder="60" 
                    required
                    :class="[
                      'w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm',
                      dietErrors.fats ? 'border-red-500 bg-red-50' : 'border-green-300'
                    ]"
                    @input="clearDietErrors"
                  >
                  <span class="absolute right-2 top-2 text-xs text-green-600">g</span>
                </div>
                <p v-if="dietErrors.fats" class="text-red-500 text-xs mt-1">{{ dietErrors.fats }}</p>
              </div>
            </div>
          </div>

          <!-- Hydratation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Hydratation</label>
            <div class="flex items-center space-x-4">
              <button @click="removeWater" class="flex-shrink-0 w-10 h-10 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <div class="flex-1 text-center">
                <div class="text-2xl font-bold text-blue-600">{{ dietData.water }}ml</div>
                <div class="text-sm text-gray-500">{{ Math.round(dietData.water / 250) }} verres</div>
              </div>
              <button @click="addWater" class="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex space-x-3">
            <button @click="closeDietModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveDietData" class="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700">
              {{ isEditMode ? 'Modifier' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Modal -->
    <div v-if="showActivityModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" @click="closeActivityModal">
      <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">{{ isEditMode ? 'Modifier l\'activité' : 'Activité' }}</h2>
                <p class="text-orange-100">{{ isEditMode ? 'Modifiez votre exercice' : 'Enregistrez votre activité physique' }}</p>
              </div>
            </div>
            <button @click="closeActivityModal" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Type d'activité <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="activityData.activityType" 
              type="text" 
              placeholder="Course à pied, natation, vélo..." 
              :class="[
                'w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                activityErrors.activityType ? 'border-red-500 bg-red-50' : 'border-gray-300'
              ]"
              @input="clearActivityErrors"
            >
            <p v-if="activityErrors.activityType" class="text-red-500 text-xs mt-1">{{ activityErrors.activityType }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Durée <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input 
                  v-model="activityData.duration" 
                  type="number" 
                  min="1" 
                  placeholder="30" 
                  :class="[
                    'w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
                    activityErrors.duration ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  ]"
                  @input="clearActivityErrors"
                >
                <span class="absolute right-3 top-3 text-gray-500">min</span>
              </div>
              <p v-if="activityErrors.duration" class="text-red-500 text-xs mt-1">{{ activityErrors.duration }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure</label>
              <input 
                v-model="activityData.time" 
                type="time" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Intensité <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="intensity in activityIntensities"
                :key="intensity.value"
                @click="activityData.intensity = intensity.value; clearActivityErrors()"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  activityData.intensity === intensity.value 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : activityErrors.intensity 
                      ? 'border-red-300 hover:border-red-400'
                      : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ intensity.emoji }}</div>
                <div class="text-xs">{{ intensity.label }}</div>
              </button>
            </div>
            <p v-if="activityErrors.intensity" class="text-red-500 text-xs mt-2">{{ activityErrors.intensity }}</p>
          </div>

          <!-- Calories estimées -->
          <div v-if="estimatedCalories" class="bg-orange-50 p-4 rounded-lg text-center">
            <h4 class="font-semibold text-orange-800 mb-2">Calories estimées</h4>
            <div class="text-2xl font-bold text-orange-600">{{ estimatedCalories }} kcal</div>
          </div>

          <div class="flex space-x-3">
            <button @click="closeActivityModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveActivityData" class="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700">
              {{ isEditMode ? 'Modifier' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mood Modal -->
    <div v-if="showMoodModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" @click="closeMoodModal">
      <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Header -->
        <div class="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">{{ isEditMode ? 'Modifier l\'humeur' : 'Humeur' }}</h2>
                <p class="text-pink-100">{{ isEditMode ? 'Modifiez votre état d\'esprit' : 'Comment vous sentez-vous aujourd\'hui ?' }}</p>
              </div>
            </div>
            <button @click="closeMoodModal" class="text-white hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Humeur <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="mood in moodOptions"
                :key="mood.value"
                @click="moodData.mood = mood.value; clearMoodErrors()"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  moodData.mood === mood.value 
                    ? 'border-pink-500 bg-pink-50 text-pink-700' 
                    : moodErrors.mood 
                      ? 'border-red-300 hover:border-red-400'
                      : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ mood.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ mood.label }}</div>
              </button>
            </div>
            <p v-if="moodErrors.mood" class="text-red-500 text-xs mt-2">{{ moodErrors.mood }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Niveau d'énergie <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="energy in energyOptions"
                :key="energy.value"
                @click="moodData.energy = energy.value; clearMoodErrors()"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  moodData.energy === energy.value 
                    ? 'border-pink-500 bg-pink-50 text-pink-700' 
                    : moodErrors.energy 
                      ? 'border-red-300 hover:border-red-400'
                      : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ energy.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ energy.label }}</div>
              </button>
            </div>
            <p v-if="moodErrors.energy" class="text-red-500 text-xs mt-2">{{ moodErrors.energy }}</p>
          </div>

          <div class="flex space-x-3">
            <button @click="closeMoodModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveMoodData" class="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700">
              {{ isEditMode ? 'Modifier' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dataService, getErrorType, formatErrorMessage, moodService } from '../services/index.js'
import { MoodData } from '../models/MoodData.js'
import { useToast } from 'vue-toastification'
import { formatDateForAPI } from '../utils/dateUtils.js'

export default {
  name: 'HomePage',
  components: {
  },
  props: {
    dateInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      displayState: 'TODAY_NO_DATA', // 'TODAY_NO_DATA', 'PAST_NO_DATA', 'WITH_DATA'
      currentData: {}, // Données actuelles de la date sélectionnée
      selectedDate: new Date(),
      formattedSelectedDate: '',
      // Informations individuelles pour chaque type de donnée
      individualData: {
        sleep: { hasData: false, formattedData: null },
        diet: { hasData: false, formattedData: null },
        activity: { hasData: false, formattedData: null },
        mood: { hasData: false, formattedData: null }
      },
      // États pour la gestion des données
      isLoading: false,
      isSaving: false,
      error: null,
      // Erreurs de validation pour chaque modale
      sleepErrors: {},
      dietErrors: {},
      activityErrors: {},
      moodErrors: {},
      showSleepModal: false,
      showDietModal: false,
      showActivityModal: false,
      showMoodModal: false,
      // Données pré-remplies (pour modification)
      isEditMode: false,
      sleepData: {
        bedtime: '',
        wakeup: '',
        quality: 'good'
      },
      dietData: {
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: '',
        water: 1500,
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
      },
      activityData: {
        activityType: '',
        duration: '',
        time: '',
        intensity: 'moderate',
        calories: ''
      },
      moodData: {
        mood: 'neutral',
        energy: 'neutral'
      },
      sleepQualities: [
        { value: 'poor', emoji: '😴', label: 'Mauvais' },
        { value: 'fair', emoji: '😐', label: 'Correct' },
        { value: 'good', emoji: '🙂', label: 'Bon' },
        { value: 'very_good', emoji: '😊', label: 'Très bon' },
        { value: 'excellent', emoji: '😁', label: 'Excellent' }
      ],
      activityIntensities: [
        { value: 'low', emoji: '🚶', label: 'Faible' },
        { value: 'moderate', emoji: '🏃', label: 'Modérée' },
        { value: 'high', emoji: '💪', label: 'Élevée' }
      ],
      moodOptions: [
        { value: 'awful', emoji: '😢', label: 'Horrible' },
        { value: 'bad', emoji: '😞', label: 'Mauvais' },
        { value: 'neutral', emoji: '😐', label: 'Neutre' },
        { value: 'good', emoji: '🙂', label: 'Bien' },
        { value: 'great', emoji: '😃', label: 'Excellent' }
      ],
      energyOptions: [
        { value: 'sick', emoji: '🤒', label: 'Malade' },
        { value: 'tired', emoji: '😴', label: 'Fatigué' },
        { value: 'neutral', emoji: '😐', label: 'Neutre' },
        { value: 'fit', emoji: '💪', label: 'En forme' },
        { value: 'energetic', emoji: '⚡', label: 'Énergique' }
      ],
      conseilsDuJour: [
        "💧 N'oublie pas de boire de l'eau ! Ton corps en a besoin.",
        "🏃‍♂️ Une petite marche de 10 minutes peut faire des miracles.",
        "😴 Dors bien ce soir, ton corps se régénère pendant le sommeil.",
        "🍎 Mange un fruit frais, c'est bon pour la santé !",
        "🧘‍♀️ Prends 5 minutes pour respirer profondément.",
        "📱 Fais une pause écran, tes yeux te remercieront.",
        "💪 Note 3 choses positives de ta journée.",
        "🌞 Profite du soleil si possible, la vitamine D c'est important !",
        "🎵 Écoute ta musique préférée, ça booste le moral.",
        "🤗 Envoie un message sympa à quelqu'un que tu aimes."
      ],
      conseilAleatoire: ""
    }
  },
  computed: {
    pageTitle() {
      const today = new Date()
      if (this.isSameDay(this.selectedDate, today)) {
        return 'Aujourd\'hui'
      }
      return this.formattedSelectedDate
    },
    sleepDuration() {
      if (this.sleepData.bedtime && this.sleepData.wakeup) {
        const bedTime = new Date(`1970-01-01T${this.sleepData.bedtime}`);
        let wakeUp = new Date(`1970-01-01T${this.sleepData.wakeup}`);
        
        // Si l'heure de réveil est antérieure à l'heure de coucher, 
        // cela signifie qu'on se réveille le jour suivant
        if (wakeUp < bedTime) {
          wakeUp = new Date(`1970-01-02T${this.sleepData.wakeup}`);
        }
        
        const durationMs = wakeUp - bedTime;
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m`;
      }
      return null;
    },
    estimatedCalories() {
      if (this.activityData.duration && this.activityData.intensity) {
        const duration = parseInt(this.activityData.duration);
        let caloriesPerMinute = 5; // Base pour intensité modérée
        
        switch (this.activityData.intensity) {
          case 'low':
            caloriesPerMinute = 3;
            break;
          case 'moderate':
            caloriesPerMinute = 5;
            break;
          case 'high':
            caloriesPerMinute = 8;
            break;
        }
        
        return Math.round(duration * caloriesPerMinute);
      }
      return null;
    },
    calculatedCalories() {
      if (this.dietData.protein && this.dietData.carbs && this.dietData.fats) {
        const proteinCals = parseFloat(this.dietData.protein) * 4;
        const carbsCals = parseFloat(this.dietData.carbs) * 4;
        const fatsCals = parseFloat(this.dietData.fats) * 9;
        
        return Math.round(proteinCals + carbsCals + fatsCals);
      }
      return null;
    }
  },
  methods: {
    /**
     * ❌ ANCIENNE MÉTHODE - Remplacée par l'utilisation des données déjà chargées par Navbar
     * Conservée pour compatibilité si nécessaire (mais ne devrait plus être utilisée)
     */
    async loadDataForModals() {
      console.warn('⚠️ [HomePage] loadDataForModals() appelée alors que les données devraient déjà être disponibles via Navbar')
      console.warn('⚠️ Cela indique une requête dupliquée - vérifiez le flux de données')
      
      try {
        this.isLoading = true
        this.error = null
        
        const dateKey = this.formatDateForAPI(this.selectedDate)
        const allData = await dataService.getAllDataForDate(dateKey)
        
        // Stocker les données pour les modales
        this.storeDataForModals(allData)
        
      } catch (error) {
        console.error('Erreur lors du chargement des données pour les modales:', error)
        this.error = {
          type: getErrorType(error),
          message: formatErrorMessage(error)
        }
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Réinitialiser tous les formulaires quand aucune donnée n'est disponible
     */
    resetAllForms() {
      this.resetSleepForm()
      this.resetDietForm()
      this.resetActivityForm()
      this.resetMoodForm()
    },

    /**
     * Stocker les données pour pré-remplir les modales
     */
    storeDataForModals(allData) {
      // Stocker les données de sommeil
      if (allData.sleep && allData.sleep.hasRealData) {
        this.sleepData = {
          bedtime: allData.sleep.bedtime || '',
          wakeup: allData.sleep.wakeup || '',
          quality: allData.sleep.quality || 'good'
        }
      }
      
      // Stocker les données d'alimentation
      if (allData.diet && allData.diet.hasRealData) {
        this.dietData = {
          breakfast: allData.diet.breakfast || '',
          lunch: allData.diet.lunch || '',
          dinner: allData.diet.dinner || '',
          snacks: allData.diet.snacks || '',
          water: allData.diet.water || 1500,
          calories: allData.diet.calories || '',
          protein: allData.diet.protein || '',
          carbs: allData.diet.carbs || '',
          fats: allData.diet.fats || ''
        }
      }
      
      // Stocker les données d'activité (première activité de la journée)
      if (allData.activity && allData.activity.length > 0) {
        const firstActivity = allData.activity[0]
        this.activityData = {
          activityType: firstActivity.activityType || '',
          duration: firstActivity.duration || '',
          time: firstActivity.time || '',
          intensity: firstActivity.intensity || 'moderate',
          calories: firstActivity.calories || ''
        }
      }
      
      // Stocker les données d'humeur
      if (allData.mood && allData.mood.hasRealData) {
        this.moodData = {
          mood: allData.mood.mood || 'neutral',
          energy: allData.mood.energy || 'neutral'
        }
      }
    },

    onDateChanged(dateInfo) {
      // Recevoir les informations de la navbar
      this.displayState = dateInfo.displayState
      this.currentData = dateInfo.data || {}
      this.selectedDate = dateInfo.selectedDate
      this.formattedSelectedDate = this.selectedDate.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      
      // Stocker les informations individuelles de chaque type de donnée
      this.individualData = dateInfo.individualData || {
        sleep: { hasData: false, formattedData: null },
        diet: { hasData: false, formattedData: null },
        activity: { hasData: false, formattedData: null },
        mood: { hasData: false, formattedData: null }
      }
      
      console.log('📥 [HomePage] Données individuelles reçues:', this.individualData)
      
      // ✅ UTILISER LES DONNÉES DÉJÀ CHARGÉES au lieu de refaire des requêtes
      if (dateInfo.fullData) {
        console.log('🚀 [HomePage] Utilisation des données déjà chargées par la Navbar')
        this.storeDataForModals(dateInfo.fullData)
      } else {
        console.log('⚠️ [HomePage] Pas de données complètes, réinitialisation des formulaires')
        this.resetAllForms()
      }
    },
    isSameDay(date1, date2) {
      return date1.toDateString() === date2.toDateString()
    },
    getMoodLabel(mood) {
      const moodLabels = {
        'happy': 'Joyeux',
        'neutral': 'Neutre',
        'sad': 'Triste',
        'angry': 'En colère',
        'excited': 'Excité',
        'calm': 'Calme'
      }
      return moodLabels[mood] || 'Non renseigné'
    },
    getMoodImage(mood) {
      const moodImages = {
        'happy': '/img/happy.png',
        'neutral': '/img/neutral.png',
        'sad': '/img/sad.png'
      }
      return moodImages[mood] || '/img/neutral.png'
    },
    
    getMoodEmoji(mood) {
      const moodEmojis = {
        1: '😢',
        2: '😞',
        3: '😐',
        4: '😊',
        5: '😁'
      };
      return moodEmojis[mood] || '😐';
    },
    openSleepModal() {
      // Si les données existent déjà, rediriger vers les détails
      if (this.individualData.sleep.hasData) {
        console.log('🔄 [HomePage] Redirection vers les détails du sommeil')
        this.$router.push({ name: 'SleepDetails' })
        return
      }
      
      // Sinon, ouvrir la modale d'ajout
      console.log('➕ [HomePage] Ouverture de la modale d\'ajout du sommeil')
      this.clearSleepErrors()
      this.isEditMode = false
      this.resetSleepForm()
      this.showSleepModal = true
    },
    closeSleepModal() {
      this.showSleepModal = false
    },
    openDietModal() {
      // Si les données existent déjà, rediriger vers les détails
      if (this.individualData.diet.hasData) {
        console.log('🔄 [HomePage] Redirection vers les détails de l\'alimentation')
        this.$router.push({ name: 'DietDetails' })
        return
      }
      
      // Sinon, ouvrir la modale d'ajout
      console.log('➕ [HomePage] Ouverture de la modale d\'ajout de l\'alimentation')
      this.clearDietErrors()
      this.isEditMode = false
      this.resetDietForm()
      this.showDietModal = true
    },
    closeDietModal() {
      this.showDietModal = false
    },
    openActivityModal() {
      if (this.individualData.activity.hasData) {
        this.$router.push({ name: 'ActivityDetails', query: { date: this.formatDateForAPI(this.selectedDate) } })
        return
      }
      this.clearActivityErrors()
      this.isEditMode = false
      this.resetActivityForm()
      this.showActivityModal = true
    },
    closeActivityModal() {
      this.showActivityModal = false
    },
    openMoodModal() {
      if (this.individualData.mood.hasData) {
        this.$router.push({ name: 'Mood', query: { date: this.formatDateForAPI(this.selectedDate) } })
        return
      }
      this.clearMoodErrors()
      this.isEditMode = false
      this.resetMoodForm()
      this.showMoodModal = true
    },
    closeMoodModal() {
      this.showMoodModal = false
    },
    
    // ====== MÉTHODES DE VALIDATION ======
    
    validateSleepData() {
      const errors = {}
      
      // Validation des heures obligatoires
      if (!this.sleepData.bedtime) {
        errors.bedtime = 'L\'heure de coucher est obligatoire'
      }
      
      if (!this.sleepData.wakeup) {
        errors.wakeup = 'L\'heure de réveil est obligatoire'
      }
      
      // Validation de la durée de sommeil
      if (this.sleepData.bedtime && this.sleepData.wakeup) {
        const bedTime = new Date(`1970-01-01T${this.sleepData.bedtime}`)
        let wakeTime = new Date(`1970-01-01T${this.sleepData.wakeup}`)
        
        if (wakeTime < bedTime) {
          wakeTime.setDate(wakeTime.getDate() + 1)
        }
        
        const durationMs = wakeTime - bedTime
        const durationHours = durationMs / (1000 * 60 * 60)
        
        if (durationHours < 1) {
          errors.duration = 'La durée de sommeil doit être d\'au moins 1 heure'
        }
        if (durationHours > 16) {
          errors.duration = 'La durée de sommeil ne peut pas dépasser 16 heures'
        }
      }
      
      // Validation de la qualité
      const validQualities = ['poor', 'fair', 'good', 'very_good', 'excellent']
      if (!validQualities.includes(this.sleepData.quality)) {
        errors.quality = 'Veuillez sélectionner une qualité de sommeil'
      }
      
      this.sleepErrors = errors
      return Object.keys(errors).length === 0
    },
    
    validateDietData() {
      console.log('🔍 [validateDietData] Début de la validation des données d\'alimentation')
      console.log('🔍 [validateDietData] Données à valider:', this.dietData)
      
      const errors = {}
      
      // VALIDATION OBLIGATOIRE DES DONNÉES NUTRITIONNELLES
      
      // Calories obligatoires
      if (!this.dietData.calories || parseFloat(this.dietData.calories) <= 0) {
        errors.calories = 'Les calories sont obligatoires et doivent être supérieures à 0'
        console.log('❌ [validateDietData] Erreur calories:', errors.calories)
      } else if (parseFloat(this.dietData.calories) < 500) {
        errors.calories = 'Les calories semblent trop faibles (minimum 500)'
        console.log('❌ [validateDietData] Erreur calories:', errors.calories)
      } else if (parseFloat(this.dietData.calories) > 5000) {
        errors.calories = 'Les calories semblent trop élevées (maximum 5000)'
        console.log('❌ [validateDietData] Erreur calories:', errors.calories)
      }
      
      // Protéines obligatoires
      if (!this.dietData.protein || parseFloat(this.dietData.protein) <= 0) {
        errors.protein = 'Les protéines sont obligatoires et doivent être supérieures à 0'
        console.log('❌ [validateDietData] Erreur protein:', errors.protein)
      } else if (parseFloat(this.dietData.protein) < 10) {
        errors.protein = 'Les protéines semblent trop faibles (minimum 10g)'
        console.log('❌ [validateDietData] Erreur protein:', errors.protein)
      } else if (parseFloat(this.dietData.protein) > 300) {
        errors.protein = 'Les protéines semblent trop élevées (maximum 300g)'
        console.log('❌ [validateDietData] Erreur protein:', errors.protein)
      }
      
      // Glucides obligatoires
      if (!this.dietData.carbs || parseFloat(this.dietData.carbs) <= 0) {
        errors.carbs = 'Les glucides sont obligatoires et doivent être supérieurs à 0'
        console.log('❌ [validateDietData] Erreur carbs:', errors.carbs)
      } else if (parseFloat(this.dietData.carbs) < 20) {
        errors.carbs = 'Les glucides semblent trop faibles (minimum 20g)'
        console.log('❌ [validateDietData] Erreur carbs:', errors.carbs)
      } else if (parseFloat(this.dietData.carbs) > 500) {
        errors.carbs = 'Les glucides semblent trop élevés (maximum 500g)'
        console.log('❌ [validateDietData] Erreur carbs:', errors.carbs)
      }
      
      // Lipides obligatoires
      if (!this.dietData.fats || parseFloat(this.dietData.fats) <= 0) {
        errors.fats = 'Les lipides sont obligatoires et doivent être supérieurs à 0'
        console.log('❌ [validateDietData] Erreur fats:', errors.fats)
      } else if (parseFloat(this.dietData.fats) < 10) {
        errors.fats = 'Les lipides semblent trop faibles (minimum 10g)'
        console.log('❌ [validateDietData] Erreur fats:', errors.fats)
      } else if (parseFloat(this.dietData.fats) > 200) {
        errors.fats = 'Les lipides semblent trop élevés (maximum 200g)'
        console.log('❌ [validateDietData] Erreur fats:', errors.fats)
      }
      
      // Validation de l'eau
      if (this.dietData.water < 0) {
        errors.water = 'La quantité d\'eau ne peut pas être négative'
        console.log('❌ [validateDietData] Erreur water:', errors.water)
      }
      if (this.dietData.water > 5000) {
        errors.water = 'La quantité d\'eau semble trop élevée (maximum 5L)'
        console.log('❌ [validateDietData] Erreur water:', errors.water)
      }
      
      // Note : Les calories calculées sont affichées à titre informatif seulement
      // Pas de validation stricte car les sources de données peuvent varier
      
      console.log('🔍 [validateDietData] Erreurs trouvées:', errors)
      this.dietErrors = errors
      const isValid = Object.keys(errors).length === 0
      console.log('🔍 [validateDietData] Validation finale:', isValid)
      return isValid
    },
    
    validateActivityData() {
      const errors = {}
      
      // Validation du nom obligatoire
      if (!this.activityData.activityType || !this.activityData.activityType.trim()) {
        errors.activityType = 'Le type d\'activité est obligatoire'
      } else if (this.activityData.activityType.trim().length < 2) {
        errors.activityType = 'Le type d\'activité doit contenir au moins 2 caractères'
      }
      
      // Validation de la durée obligatoire
      if (!this.activityData.duration || this.activityData.duration <= 0) {
        errors.duration = 'La durée est obligatoire et doit être supérieure à 0'
      } else if (this.activityData.duration > 720) {
        errors.duration = 'La durée ne peut pas dépasser 12 heures (720 minutes)'
      }
      
      // Validation de l'heure (optionnelle mais si renseignée, doit être valide)
      if (this.activityData.time) {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (!timeRegex.test(this.activityData.time)) {
          errors.time = 'L\'heure doit être au format HH:MM'
        }
      }
      
      // Validation des calories
      if (this.activityData.calories && this.activityData.calories < 0) {
        errors.calories = 'Les calories ne peuvent pas être négatives'
      }
      
      // Validation de l'intensité
      const validIntensities = ['low', 'moderate', 'high']
      if (!validIntensities.includes(this.activityData.intensity)) {
        errors.intensity = 'Veuillez sélectionner une intensité'
      }
      
      this.activityErrors = errors
      return Object.keys(errors).length === 0
    },
    
    validateMoodData() {
      const errors = {}
      
      // Validation de l'humeur obligatoire
      const validMoods = ['awful', 'bad', 'neutral', 'good', 'great']
      if (!validMoods.includes(this.moodData.mood)) {
        errors.mood = 'Veuillez sélectionner votre humeur'
      }
      
      // Validation de l'énergie obligatoire
      const validEnergyLevels = ['sick', 'tired', 'neutral', 'fit', 'energetic']
      if (!validEnergyLevels.includes(this.moodData.energy)) {
        errors.energy = 'Veuillez sélectionner votre niveau d\'énergie'
      }
      
      this.moodErrors = errors
      return Object.keys(errors).length === 0
    },
    
    // ====== MÉTHODES DE RÉINITIALISATION DES ERREURS ======
    
    clearSleepErrors() {
      this.sleepErrors = {}
    },
    
    clearDietErrors() {
      this.dietErrors = {}
    },
    
    clearActivityErrors() {
      this.activityErrors = {}
    },
    
    clearMoodErrors() {
      this.moodErrors = {}
    },
    
    async saveSleepData() {
      // Validation complète
      if (!this.validateSleepData()) {
        return // Les erreurs sont déjà stockées dans sleepErrors
      }
      
      try {
        this.isSaving = true
        this.error = null
        
        const dateKey = this.formatDateForAPI(this.selectedDate)
        const sleepDataToSave = {
          ...this.sleepData,
          duration: this.sleepDuration
        }
        
        await dataService.saveSleepData(dateKey, sleepDataToSave)
        
        this.showSleepModal = false
        
        // Afficher un message de succès
        this.showSuccessMessage('Données de sommeil enregistrées avec succès !')
        
        // Émettre l'événement pour que la navbar recharge les données
        this.$emit('data-updated')
        
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des données de sommeil:', error)
        this.error = {
          type: getErrorType(error),
          message: formatErrorMessage(error)
        }
      } finally {
        this.isSaving = false
      }
    },
    async saveDietData() {
      console.log('🍽️ [saveDietData] Début de la sauvegarde des données d\'alimentation')
      console.log('🍽️ [saveDietData] Données à sauvegarder:', this.dietData)
      
      // Validation complète
      const isValid = this.validateDietData()
      console.log('🍽️ [saveDietData] Validation réussie:', isValid)
      
      if (!isValid) {
        console.log('❌ [saveDietData] Validation échouée, erreurs:', this.dietErrors)
        return // Les erreurs sont déjà stockées dans dietErrors
      }
      
      try {
        this.isSaving = true
        this.error = null
        
        const dateKey = this.formatDateForAPI(this.selectedDate)
        console.log('🍽️ [saveDietData] Clé de date:', dateKey)
        
        await dataService.saveDietData(dateKey, this.dietData)
        console.log('✅ [saveDietData] Données sauvegardées avec succès')
        
        this.showDietModal = false
        
        // Afficher un message de succès
        this.showSuccessMessage('Données d\'alimentation enregistrées avec succès !')
        
        // Émettre l'événement pour que la navbar recharge les données
        this.$emit('data-updated')
        
      } catch (error) {
        console.error('❌ [saveDietData] Erreur lors de la sauvegarde des données d\'alimentation:', error)
        this.error = {
          type: getErrorType(error),
          message: formatErrorMessage(error)
        }
      } finally {
        this.isSaving = false
      }
    },
    async saveActivityData() {
      const toast = useToast();
      // Validation complète
      if (!this.validateActivityData()) {
        return // Les erreurs sont déjà stockées dans activityErrors
      }
      try {
        this.isSaving = true
        this.error = null
        const dateKey = this.formatDateForAPI(this.selectedDate)
        // Utiliser l'estimation si pas de calories renseignées
        const finalData = {
          ...this.activityData,
          calories: this.activityData.calories || this.estimatedCalories
        }
        await dataService.saveActivityData(dateKey, finalData)
        this.showActivityModal = false
        // Afficher un message de succès
        toast.success('Activité enregistrée avec succès !');
        // Émettre l'événement pour que la navbar recharge les données (et donc la HomePage)
        this.$emit('data-updated')
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des données d\'activité:', error)
        this.error = {
          type: getErrorType(error),
          message: formatErrorMessage(error)
        }
      } finally {
        this.isSaving = false
      }
    },
    async saveMoodData() {
      const toast = useToast();
      this.selectedMood = this.moodData.mood;
      this.selectedEnergy = this.moodData.energy;
      this.isSaving = true;
      try {
        const dateKey = this.formatDateForAPI(this.selectedDate);
        // On complète l'objet avec tous les champs attendus, y compris l'id
        const moodDataRaw = {
          id: this.moodData.id, // <-- Ajoute l'id ici si présent
          mood: this.moodData.mood || 'neutral',
          energy: this.moodData.energy || 'neutral',
          stress: this.moodData.stress || 'neutral',
          anxiety: this.moodData.anxiety || 'neutral',
          notes: this.moodData.notes || '',
          triggers: this.moodData.triggers || [],
          date: dateKey
        };
        const moodDataToSave = new MoodData(moodDataRaw);

        let result;
        if (moodDataToSave.id) {
          // Update
          result = await moodService.update(moodDataToSave.id, moodDataToSave);
        } else {
          // Create
          result = await moodService.create(moodDataToSave);
        }

        if (!result || typeof result !== 'object' || !('id' in result)) {
          throw new Error('La réponse du backend est invalide ou vide.');
        }
        this.showMoodModal = false;
        toast.success('Données d\'humeur enregistrées ou modifiées avec succès !');
        this.$emit('data-updated');
      } catch (error) {
        console.error('[saveMoodData] Erreur lors de l\'enregistrement mood:', error);
        toast.error('Erreur lors de l\'enregistrement : ' + (error.message || error));
      } finally {
        this.isSaving = false;
      }
    },
    addWater() {
      this.dietData.water += 250
    },
    removeWater() {
      if (this.dietData.water >= 250) {
        this.dietData.water -= 250
      }
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        if (this.showSleepModal) this.closeSleepModal()
        else if (this.showDietModal) this.closeDietModal()
        else if (this.showActivityModal) this.closeActivityModal()
        else if (this.showMoodModal) this.closeMoodModal()
      }
    },
    closeAllModalsOnMobile() {
      // Vérifier si on est sur mobile (largeur < 768px pour correspondre à la breakpoint md de Tailwind)
      if (window.innerWidth < 768) {
        this.showSleepModal = false
        this.showDietModal = false
        this.showActivityModal = false
        this.showMoodModal = false
      }
    },
    goToToday(event) {
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      // Naviguer vers aujourd'hui en effaçant les paramètres de date
      this.$router.push({
        path: '/',
        query: { timeButton: 'today' }
      })
    },

    // ====== MÉTHODES UTILITAIRES ======

    /**
     * Afficher un message de succès
     */
    showSuccessMessage(message) {
      // TODO: Implémenter une notification toast plus élégante
      alert(message)
    },

    /**
     * Réinitialiser le formulaire de sommeil
     */
    resetSleepForm() {
      this.sleepData = {
        bedtime: '',
        wakeup: '',
        quality: 'good'
      }
    },

    /**
     * Réinitialiser le formulaire d'alimentation
     */
    resetDietForm() {
      this.dietData = {
        breakfast: '',
        lunch: '',
        dinner: '',
        snacks: '',
        water: 1500,
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
      }
    },

    /**
     * Réinitialiser le formulaire d'activité
     */
    resetActivityForm() {
      this.activityData = {
        activityType: '',
        duration: '',
        time: '',
        intensity: 'moderate',
        calories: ''
      }
    },

    /**
     * Réinitialiser le formulaire d'humeur
     */
    resetMoodForm() {
      this.moodData = {
        mood: 'neutral',
        energy: 'neutral'
      }
    },

    /**
     * Fermer l'erreur
     */
    closeError() {
      this.error = null
    },
    formatDateForAPI(date) {
      // Formater la date pour éviter les problèmes de timezone
      // Note: Cette méthode est dépréciée, utilisez l'import depuis dateUtils à la place
      return formatDateForAPI(date);
    },

    /**
     * Générer le conseil du jour basé sur la date
     */
    generateConseilDuJour() {
      const today = new Date()
      const dateString = today.toISOString().split('T')[0] // Format YYYY-MM-DD
      
      // Créer un hash simple basé sur la date
      let hash = 0
      for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
      }
      
      // Utiliser le hash pour sélectionner un conseil
      const index = Math.abs(hash) % this.conseilsDuJour.length
      this.conseilAleatoire = this.conseilsDuJour[index]
    },

    /**
     * Retry en cas d'erreur
     */
    async retryOperation() {
      this.error = null
      // Émettre l'événement pour que la navbar recharge les données
      this.$emit('data-updated')
    },
    async refreshAllData() {
      // Recharge toutes les données (force la navbar à réémettre l'événement)
      await this.loadDataForModals();
    },
    getMoodNote(mood) {
      // mood est déjà formaté (voir MoodData.fromAPI)
      // On utilise la logique du modèle : moodScore + energyScore
      if (!mood) return '-';
      // Si mood est déjà une instance de MoodData
      if (mood instanceof MoodData) {
        return mood.moodScore + mood.energyScore;
      }
      // Sinon, on tente de reconstituer
      const scores = {
        'awful': 2, 'bad': 4, 'neutral': 6, 'good': 8, 'great': 10,
        'sick': 1, 'tired': 3, 'neutral': 5, 'fit': 8, 'energetic': 10
      };
      const moodScore = scores[(mood.mood || '').toLowerCase()] || 6;
      const energyScore = scores[(mood.energy || '').toLowerCase()] || 5;
      return moodScore + energyScore;
    },
    reloadIndividualData() {
      // Recharge les données individuelles (mood, activity, etc.) après modification
      this.loadDataForModals();
    },
  },
  async mounted() {
    document.addEventListener('keydown', this.handleEscapeKey)
    // Les données seront reçues via l'événement date-changed de la navbar
    // Pas besoin de charger les données ici
    this.$on?.('data-updated', this.refreshAllData)
    // Générer le conseil du jour basé sur la date
    this.generateConseilDuJour()
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey)
  },
  watch: {
    dateInfo: {
      handler(newDateInfo) {
        if (newDateInfo) {
          this.onDateChanged(newDateInfo)
          // Fermer les modals sur mobile lors du changement de date
          this.closeAllModalsOnMobile()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
/* Backdrop blur pour les modals */
.modal-backdrop {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

/* Animations pour les modals */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active, .modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from, .modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* Animation des boutons d'options */
.option-button {
  transition: all 0.2s ease;
}

.option-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Scrollbar personnalisée pour les modals */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Support pour les navigateurs sans backdrop-filter */
@supports not (backdrop-filter: blur(8px)) {
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
