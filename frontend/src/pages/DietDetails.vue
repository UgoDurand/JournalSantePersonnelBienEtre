<template>
  <main class="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
    <!-- Header héroïque -->
    <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-green-800 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-16 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div class="absolute top-8 right-32 w-16 h-16 bg-white opacity-5 rounded-full animate-bounce"></div>
        <div class="absolute bottom-24 left-1/4 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="relative p-6 sm:p-8 lg:p-12">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="mb-6 lg:mb-0">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div>
                <h1 class="text-4xl lg:text-5xl font-bold mb-2">Journal Alimentaire</h1>
                <p class="text-green-100 text-lg">Votre nutrition quotidienne analysée</p>
              </div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-md">
              <p class="text-green-100 text-sm mb-2">🍎 Bilan d'aujourd'hui</p>
              <p class="text-white text-xl font-semibold">2,200 kcal • 8 verres d'eau • Équilibré</p>
            </div>
          </div>
          <button @click="openDietModal" class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-2xl border border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier mes repas
            </div>
        </button>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8 lg:p-12 space-y-8">
      <!-- Résumé nutritionnel -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-2xl">🔥</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Calories</h3>
          <p class="text-3xl font-bold text-green-600 mb-1">2,200</p>
          <p class="text-sm text-gray-500">Objectif : 2,000 kcal</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span class="text-2xl">🥩</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Protéines</h3>
          <p class="text-3xl font-bold text-rose-600 mb-1">85g</p>
          <p class="text-sm text-gray-500">Objectif : 75g</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-2xl">🌾</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Glucides</h3>
          <p class="text-3xl font-bold text-amber-600 mb-1">245g</p>
          <p class="text-sm text-gray-500">Objectif : 220g</p>
        </div>

        <div class="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span class="text-2xl">💧</span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">Hydratation</h3>
          <p class="text-3xl font-bold text-blue-600 mb-1">2.0L</p>
          <p class="text-sm text-gray-500">8 verres sur 6 requis</p>
        </div>
      </div>

      <!-- Repas de la journée -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Repas principaux -->
        <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Mes Repas
          </h2>

          <div class="space-y-4">
            <div class="p-4 bg-yellow-50 rounded-2xl border-l-4 border-yellow-400">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-yellow-800 flex items-center">
                  <span class="text-xl mr-2">🌅</span>
                  Petit-déjeuner (7h30)
                </h3>
                <span class="text-yellow-600 font-bold">420 kcal</span>
              </div>
              <p class="text-yellow-700 text-sm">Aucune donnée renseignée.</p>
            </div>

            <div class="p-4 bg-orange-50 rounded-2xl border-l-4 border-orange-400">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-orange-800 flex items-center">
                  <span class="text-xl mr-2">☀️</span>
                  Déjeuner (12h15)
                </h3>
                <span class="text-orange-600 font-bold">780 kcal</span>
              </div>
              <p class="text-orange-700 text-sm">Aucune donnée renseignée.</p>
            </div>

            <div class="p-4 bg-indigo-50 rounded-2xl border-l-4 border-indigo-400">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-indigo-800 flex items-center">
                  <span class="text-xl mr-2">🌙</span>
                  Dîner (19h45)
                </h3>
                <span class="text-indigo-600 font-bold">650 kcal</span>
              </div>
              <p class="text-indigo-700 text-sm">Aucune donnée renseignée.</p>
            </div>

            <div class="p-4 bg-purple-50 rounded-2xl border-l-4 border-purple-400">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-purple-800 flex items-center">
                  <span class="text-xl mr-2">🍎</span>
                  Collations
                </h3>
                <span class="text-purple-600 font-bold">350 kcal</span>
              </div>
              <p class="text-purple-700 text-sm">Yaourt grec aux fruits rouges, noix mélangées et carré de chocolat noir.</p>
            </div>
          </div>
        </div>

        <!-- Analyse nutritionnelle -->
      <div class="space-y-6">
          <!-- Répartition des macros -->
          <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              Répartition
            </h2>

            <!-- Graphique en cercle avec CSS -->
            <div class="relative w-48 h-48 mx-auto mb-6">
              <div class="absolute inset-0 rounded-full" style="background: conic-gradient(from 0deg, #f59e0b 0deg 130deg, #ec4899 130deg 230deg, #10b981 230deg 360deg);"></div>
              <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-800">2,200</div>
                  <div class="text-sm text-gray-600">kcal</div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                  <span class="text-gray-700">Glucides</span>
                </div>
                <span class="font-semibold">44%</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-rose-500 rounded-full mr-3"></div>
                  <span class="text-gray-700">Protéines</span>
                </div>
                <span class="font-semibold">28%</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span class="text-gray-700">Lipides</span>
                </div>
                <span class="font-semibold">28%</span>
              </div>
            </div>
          </div>

          <!-- Objectifs et conseils -->
          <div class="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Bilan
            </h2>

            <div class="space-y-4">
              <div class="p-4 bg-green-50 rounded-2xl border-l-4 border-green-400">
                <div class="flex items-start">
                  <span class="text-2xl mr-3">🎯</span>
                  <div>
                    <h3 class="font-semibold text-green-800 mb-1">Objectifs atteints</h3>
                    <p class="text-green-700 text-sm">Excellent équilibre des macronutriments et hydratation optimale.</p>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
                <div class="flex items-start">
                  <span class="text-2xl mr-3">💡</span>
                  <div>
                    <h3 class="font-semibold text-blue-800 mb-1">Points positifs</h3>
                    <p class="text-blue-700 text-sm">Repas variés, portions équilibrées, bon timing entre les repas.</p>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <h3 class="font-semibold text-gray-800 mb-2 flex items-center">
                  <span class="text-lg mr-2">🌟</span>
                  Conseil pour demain
                </h3>
                <p class="text-gray-600 text-sm">Parfait ! Continuez cette routine alimentaire équilibrée. Pensez à ajouter des oméga-3.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de modification d'alimentation -->
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
                <h2 class="text-2xl font-bold">Modifier l'alimentation</h2>
                <p class="text-green-100">Mettez à jour vos données</p>
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
            <button @click="saveDietData" class="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700" :disabled="isSaving">
              {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { dietService } from '../services/index.js'
export default {
  name: 'DietDetails',
  data() {
    return {
      showDietModal: false,
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
      meals: [
        { key: 'breakfast', label: 'Breakfast', placeholder: 'Petit-déjeuner...' },
        { key: 'lunch', label: 'Lunch', placeholder: 'Déjeuner...' },
        { key: 'dinner', label: 'Dinner', placeholder: 'Dîner...' },
        { key: 'snacks', label: 'Snacks', placeholder: 'Collations...' }
      ],
      entries: { breakfast: '', lunch: '', dinner: '', snacks: '' },
      summary: { calories: '', protein: '', carbs: '', fats: '' },
      glassSize: 250,
      targetVolume: 1500,
      water: 0,
      isSaving: false
    }
  },
  computed: {
    targetCups() {
      return this.targetVolume / this.glassSize
    }
  },
  methods: {
    openDietModal() {
      this.showDietModal = true
    },
    closeDietModal() {
      this.showDietModal = false
    },
    async saveDietData() {
      this.isSaving = true;
      try {
        // On suppose que la date est aujourd'hui (à adapter si besoin)
        const today = new Date().toISOString().split('T')[0];
        await dietService.createOrUpdate(today, this.dietData);
        this.showDietModal = false;
        alert('Données d\'alimentation mises à jour avec succès !');
      } catch (error) {
        alert('Erreur lors de l\'enregistrement : ' + (error.message || error));
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
    onLogWater() {
      this.water += this.glassSize
    },
    onRemoveWater() {
      if (this.water >= this.glassSize) this.water -= this.glassSize
    },
    onSaveLog() {
      console.log('Save log', { entries: { ...this.entries }, summary: { ...this.summary }, water: this.water })
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape' && this.showDietModal) {
        this.closeDietModal()
      }
    }
  },
  mounted() {
    // Gestion de la touche Escape pour fermer la modal
    document.addEventListener('keydown', this.handleEscapeKey)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey)
  }
}
</script>

<style scoped>
/* Backdrop blur pour la modal */
.modal-backdrop {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}
</style>
