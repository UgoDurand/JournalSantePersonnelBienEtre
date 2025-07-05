<!-- src/pages/HomePage.vue -->
<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-8 min-w-0">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 sm:mb-8">
      {{ pageTitle }}
    </h1>

    <!-- Affichage conditionnel selon l'état -->
    <div v-if="displayState === 'TODAY_NO_DATA'" class="space-y-6">
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
          <div class="bg-white rounded-xl shadow-md border-2 border-transparent group-hover:border-indigo-300 group-active:border-indigo-400 overflow-hidden">
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
        <div class="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95" @click="openDietModal">
          <div class="bg-white rounded-xl shadow-md border-2 border-transparent group-hover:border-green-300 group-active:border-green-400 overflow-hidden">
            <div class="bg-gradient-to-br from-green-500 to-emerald-600 p-3 sm:p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 sm:space-x-3">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold text-base sm:text-lg">Alimentation</h3>
                    <p class="text-green-100 text-xs sm:text-sm">Suivez votre nutrition</p>
                  </div>
                </div>
                <div class="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50">
              <div class="flex items-center justify-between">
                <span class="text-green-600 font-medium text-sm sm:text-base">Cliquez pour commencer</span>
                <div class="flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
                </div>
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
                    <p class="text-orange-100 text-xs sm:text-sm">Enregistrez vos exercices</p>
                  </div>
                </div>
                <div class="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50">
              <div class="flex items-center justify-between">
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
                    <p class="text-pink-100 text-xs sm:text-sm">Partagez votre état d'esprit</p>
                  </div>
                </div>
                <div class="bg-white/20 rounded-full p-1.5 sm:p-2">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-3 sm:p-4 bg-gradient-to-r from-pink-50 to-purple-50">
              <div class="flex items-center justify-between">
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
          Prendre soin de soi commence par de petites actions quotidiennes. 
          Chaque donnée que vous enregistrez vous rapproche de vos objectifs bien-être ! 🌟
        </p>
      </div>
    </div>

    <div v-else-if="displayState === 'PAST_NO_DATA'" class="flex flex-col items-center justify-center py-16">
      <!-- Mode "Date passée sans données" - Message trop tard -->
      <div class="text-center max-w-md">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Il est trop tard</h2>
        <p class="text-gray-500 mb-6">
          Vous ne pouvez plus ajouter de données pour le {{ formattedSelectedDate }}.
          Les données doivent être saisies le jour même.
        </p>
        <p class="text-sm text-gray-400 mb-8">
          Sélectionnez la date d'aujourd'hui pour commencer à enregistrer vos données.
        </p>
        
        <!-- Bouton vers aujourd'hui -->
        <div class="relative">
          <button
            @click="goToToday"
            @touchstart="goToToday"
            class="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <!-- Effet de brillance animé -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <!-- Contenu du bouton -->
            <div class="relative flex items-center justify-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="text-left">
                <div class="text-lg font-bold">Aller à aujourd'hui</div>
                <div class="text-sm text-white/80">Commencez dès maintenant !</div>
              </div>
              <svg class="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
          
          <!-- Petits éléments décoratifs -->
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
        </div>
      </div>
    </div>

    <div v-else-if="displayState === 'WITH_DATA'" class="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-8">
      <!-- Mode "Avec données" - Affichage normal avec vraies données -->
      <DashboardCard
          class="w-full"
          title="Sleep"
          subtitle="Rest and recovery"
          :value="currentData.sleep ? `${currentData.sleep}h` : 'Non renseigné'"
          label="Total sleep"
          image="/img/sleep.png"
          :to="{ name: 'Sleep' }"
          :show-add="false"
      />

      <DashboardCard
          class="w-full"
          title="Diet"
          subtitle="Nutrition intake"
          :value="currentData.diet ? `${currentData.diet} kcal` : 'Non renseigné'"
          label="Calories consumed"
          image="/img/food.png"
          :to="{ name: 'Diet' }"
          :show-add="false"
      />

      <DashboardCard
          class="w-full"
          title="Physical Activity"
          subtitle="Movement and exercise"
          :value="currentData.activity ? `${currentData.activity} min` : 'Non renseigné'"
          label="Exercise duration"
          image="/img/sport.png"
          :to="{ name: 'Activity' }"
          :show-add="false"
      />

      <DashboardCard
          class="w-full"
          title="Mood"
          subtitle="Emotional well-being"
          :value="getMoodLabel(currentData.mood)"
          label="Overall mood"
          :image="getMoodImage(currentData.mood)"
          :to="{ name: 'Mood' }"
          :show-add="false"
      />
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold">Sommeil</h2>
                <p class="text-indigo-100">Enregistrez vos heures de repos</p>
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure de coucher</label>
              <input v-model="sleepData.bedtime" type="time" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure de réveil</label>
              <input v-model="sleepData.wakeup" type="time" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
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

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Qualité du sommeil</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="quality in sleepQualities"
                :key="quality.value"
                @click="sleepData.quality = quality.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  sleepData.quality === quality.value 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ quality.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ quality.label }}</div>
              </button>
            </div>
          </div>

          <div class="flex space-x-3">
            <button @click="closeSleepModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveSleepData" class="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700">
              Enregistrer
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
                <h2 class="text-2xl font-bold">Alimentation</h2>
                <p class="text-green-100">Suivez votre nutrition</p>
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Petit-déjeuner</label>
              <textarea v-model="dietData.breakfast" placeholder="Flocons d'avoine avec fruits..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Déjeuner</label>
              <textarea v-model="dietData.lunch" placeholder="Salade de poulet..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Dîner</label>
              <textarea v-model="dietData.dinner" placeholder="Saumon avec légumes..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Collations</label>
              <textarea v-model="dietData.snacks" placeholder="Pomme avec beurre de cacahuète..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" rows="3"></textarea>
            </div>
          </div>

          <!-- Résumé nutritionnel -->
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-4">Résumé Nutritionnel</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">Calories</label>
                <div class="relative">
                  <input v-model="dietData.calories" type="number" min="0" placeholder="1800" class="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
                  <span class="absolute right-2 top-2 text-xs text-green-600">kcal</span>
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">Protéines</label>
                <div class="relative">
                  <input v-model="dietData.protein" type="number" min="0" placeholder="75" class="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
                  <span class="absolute right-2 top-2 text-xs text-green-600">g</span>
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">Glucides</label>
                <div class="relative">
                  <input v-model="dietData.carbs" type="number" min="0" placeholder="220" class="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
                  <span class="absolute right-2 top-2 text-xs text-green-600">g</span>
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-green-700 mb-1">Lipides</label>
                <div class="relative">
                  <input v-model="dietData.fats" type="number" min="0" placeholder="60" class="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm">
                  <span class="absolute right-2 top-2 text-xs text-green-600">g</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-3">Consommation d'eau</h3>
            <div class="flex items-center space-x-4">
              <button @click="removeWater" class="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                </svg>
              </button>
              <div class="flex-1 text-center">
                <div class="text-2xl font-bold text-green-600">{{ dietData.water / 250 }}</div>
                <div class="text-sm text-green-700">verres ({{ dietData.water }}ml)</div>
              </div>
              <button @click="addWater" class="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Enregistrer
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
                <h2 class="text-2xl font-bold">Activité Physique</h2>
                <p class="text-orange-100">Enregistrez vos exercices</p>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Type d'activité</label>
            <input v-model="activityData.name" type="text" placeholder="Course à pied, yoga, musculation..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Durée (minutes)</label>
              <input v-model="activityData.duration" type="number" min="1" placeholder="30" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Heure</label>
              <input v-model="activityData.time" type="time" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Calories brûlées (optionnel)</label>
            <div class="relative">
              <input v-model="activityData.calories" type="number" min="0" placeholder="Estimation automatique..." class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
              <span class="absolute right-3 top-3 text-sm text-orange-600">kcal</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Laissez vide pour une estimation automatique</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Intensité</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="intensity in activityIntensities"
                :key="intensity.value"
                @click="activityData.intensity = intensity.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  activityData.intensity === intensity.value 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ intensity.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ intensity.label }}</div>
              </button>
            </div>
          </div>

          <!-- Estimation automatique des calories -->
          <div v-if="estimatedCalories && !activityData.calories" class="bg-orange-50 p-4 rounded-lg text-center">
            <h4 class="font-semibold text-orange-800 mb-2">Estimation</h4>
            <div class="text-lg font-bold text-orange-600">~{{ estimatedCalories }} kcal brûlées</div>
            <button @click="activityData.calories = estimatedCalories" class="mt-2 text-sm text-orange-700 hover:text-orange-900 underline">
              Utiliser cette estimation
            </button>
          </div>

          <div class="flex space-x-3">
            <button @click="closeActivityModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveActivityData" class="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700">
              Enregistrer
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
                <h2 class="text-2xl font-bold">Humeur</h2>
                <p class="text-pink-100">Partagez votre état d'esprit</p>
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
            <label class="block text-sm font-medium text-gray-700 mb-3">Comment vous sentez-vous ?</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="mood in moodOptions"
                :key="mood.value"
                @click="moodData.mood = mood.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  moodData.mood === mood.value 
                    ? 'border-pink-500 bg-pink-50 text-pink-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ mood.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ mood.label }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Niveau d'énergie</label>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="energy in energyOptions"
                :key="energy.value"
                @click="moodData.energy = energy.value"
                :class="[
                  'option-button p-3 rounded-lg border-2 text-center transition-all',
                  moodData.energy === energy.value 
                    ? 'border-pink-500 bg-pink-50 text-pink-700' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <div class="text-2xl mb-1">{{ energy.emoji }}</div>
                <div class="text-xs hidden sm:block">{{ energy.label }}</div>
              </button>
            </div>
          </div>

          <div class="flex space-x-3">
            <button @click="closeMoodModal" class="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button @click="saveMoodData" class="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue'

export default {
  name: 'HomePage',
  components: { DashboardCard },
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
      showSleepModal: false,
      showDietModal: false,
      showActivityModal: false,
      showMoodModal: false,
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
        name: '',
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
      ]
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
    }
  },
  methods: {
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
    openSleepModal() {
      this.showSleepModal = true
    },
    closeSleepModal() {
      this.showSleepModal = false
    },
    openDietModal() {
      this.showDietModal = true
    },
    closeDietModal() {
      this.showDietModal = false
    },
    openActivityModal() {
      this.showActivityModal = true
    },
    closeActivityModal() {
      this.showActivityModal = false
    },
    openMoodModal() {
      this.showMoodModal = true
    },
    closeMoodModal() {
      this.showMoodModal = false
    },
    saveSleepData() {
      // Validation basique
      if (!this.sleepData.bedtime || !this.sleepData.wakeup) {
        alert('Veuillez remplir les heures de coucher et de réveil')
        return
      }
      
      console.log('Données de sommeil sauvegardées:', {
        ...this.sleepData,
        duration: this.sleepDuration
      })
      // TODO: Ici on enverra les données au backend
      this.showSleepModal = false
      
      // Message de confirmation
      alert('Données de sommeil enregistrées avec succès !')
      
      // Réinitialiser le formulaire
      this.sleepData = {
        bedtime: '',
        wakeup: '',
        quality: 'good'
      }
    },
    saveDietData() {
      console.log('Données d\'alimentation sauvegardées:', this.dietData)
      // TODO: Ici on enverra les données au backend
      this.showDietModal = false
      
      // Message de confirmation
      alert('Données d\'alimentation enregistrées avec succès !')
      
      // Réinitialiser le formulaire
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
    saveActivityData() {
      // Validation basique
      if (!this.activityData.name || !this.activityData.duration) {
        alert('Veuillez remplir le type d\'activité et la durée')
        return
      }
      
      // Utiliser l'estimation si pas de calories renseignées
      const finalData = {
        ...this.activityData,
        calories: this.activityData.calories || this.estimatedCalories
      }
      
      console.log('Données d\'activité sauvegardées:', finalData)
      // TODO: Ici on enverra les données au backend
      this.showActivityModal = false
      
      // Message de confirmation
      alert('Données d\'activité enregistrées avec succès !')
      
      // Réinitialiser le formulaire
      this.activityData = {
        name: '',
        duration: '',
        time: '',
        intensity: 'moderate',
        calories: ''
      }
    },
    saveMoodData() {
      console.log('Données d\'humeur sauvegardées:', this.moodData)
      // TODO: Ici on enverra les données au backend
      this.showMoodModal = false
      
      // Message de confirmation
      alert('Données d\'humeur enregistrées avec succès !')
      
      // Réinitialiser le formulaire
      this.moodData = {
        mood: 'neutral',
        energy: 'neutral'
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
    }
  },
  mounted() {
    // Gestion de la touche Escape pour fermer les modals
    document.addEventListener('keydown', this.handleEscapeKey)
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
