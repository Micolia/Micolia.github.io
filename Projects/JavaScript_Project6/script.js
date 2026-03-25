// Storage keys
const STORAGE_KEY = 'fitnessTrackerData';

// Data structure
let data = {
    meals: [],
    workouts: [],
    history: []
};

// Load data from localStorage
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        data = JSON.parse(stored);
        // Filter today's data
        const today = new Date().toDateString();
        data.meals = data.meals.filter(m => new Date(m.date).toDateString() === today);
        data.workouts = data.workouts.filter(w => new Date(w.date).toDateString() === today);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Get today's date string
function getTodayString() {
    return new Date().toISOString().split('T')[0];
}

// Add meal
function addMeal(name, calories, time) {
    const meal = {
        id: Date.now(),
        name,
        calories: parseInt(calories) || 0,
        time,
        date: new Date().toISOString()
    };
    data.meals.push(meal);
    saveData();
    renderMeals();
    updateStats();
}

// Add workout
function addWorkout(name, duration, time) {
    const workout = {
        id: Date.now(),
        name,
        duration: parseInt(duration),
        time,
        date: new Date().toISOString()
    };
    data.workouts.push(workout);
    saveData();
    renderWorkouts();
    updateStats();
}

// Delete meal
function deleteMeal(id) {
    data.meals = data.meals.filter(m => m.id !== id);
    saveData();
    renderMeals();
    updateStats();
}

// Delete workout
function deleteWorkout(id) {
    data.workouts = data.workouts.filter(w => w.id !== id);
    saveData();
    renderWorkouts();
    updateStats();
}

// Render meals list
function renderMeals() {
    const mealsList = document.getElementById('meals-list');
    const totalCaloriesEl = document.getElementById('total-calories');
    
    if (data.meals.length === 0) {
        mealsList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No meals logged today</p>';
        totalCaloriesEl.textContent = '0';
        return;
    }
    
    // Sort by time
    const sortedMeals = [...data.meals].sort((a, b) => a.time.localeCompare(b.time));
    
    mealsList.innerHTML = sortedMeals.map(meal => `
        <div class="item">
            <div class="item-info">
                <div class="item-title">${meal.name}</div>
                <div class="item-details">
                    🕐 ${meal.time} • ${meal.calories} kcal
                </div>
            </div>
            <button class="item-delete" onclick="deleteMeal(${meal.id})">❌</button>
        </div>
    `).join('');
    
    const totalCalories = data.meals.reduce((sum, meal) => sum + meal.calories, 0);
    totalCaloriesEl.textContent = totalCalories;
}

// Render workouts list
function renderWorkouts() {
    const workoutsList = document.getElementById('workouts-list');
    const totalDurationEl = document.getElementById('total-duration');
    
    if (data.workouts.length === 0) {
        workoutsList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No workouts logged today</p>';
        totalDurationEl.textContent = '0';
        return;
    }
    
    // Sort by time
    const sortedWorkouts = [...data.workouts].sort((a, b) => a.time.localeCompare(b.time));
    
    workoutsList.innerHTML = sortedWorkouts.map(workout => `
        <div class="item">
            <div class="item-info">
                <div class="item-title">${workout.name}</div>
                <div class="item-details">
                    🕐 ${workout.time} • ${workout.duration} minutes
                </div>
            </div>
            <button class="item-delete" onclick="deleteWorkout(${workout.id})">❌</button>
        </div>
    `).join('');
    
    const totalDuration = data.workouts.reduce((sum, workout) => sum + workout.duration, 0);
    totalDurationEl.textContent = totalDuration;
}

// Update statistics
function updateStats() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    
    const fullData = JSON.parse(stored);
    const allMeals = fullData.meals || [];
    const allWorkouts = fullData.workouts || [];
    
    // Get last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentMeals = allMeals.filter(m => new Date(m.date) >= sevenDaysAgo);
    const recentWorkouts = allWorkouts.filter(w => new Date(w.date) >= sevenDaysAgo);
    
    // Count active days
    const activeDates = new Set();
    recentMeals.forEach(m => activeDates.add(new Date(m.date).toDateString()));
    recentWorkouts.forEach(w => activeDates.add(new Date(w.date).toDateString()));
    
    // Calculate average calories
    const totalCalories = recentMeals.reduce((sum, m) => sum + m.calories, 0);
    const avgCalories = activeDates.size > 0 ? Math.round(totalCalories / activeDates.size) : 0;
    
    // Update UI
    document.getElementById('active-days').textContent = activeDates.size;
    document.getElementById('total-meals').textContent = recentMeals.length;
    document.getElementById('total-workouts').textContent = recentWorkouts.length;
    document.getElementById('avg-calories').textContent = avgCalories;
}

// Clear today's data
function clearToday() {
    if (confirm('Do you really want to clear today\'s data?')) {
        data.meals = [];
        data.workouts = [];
        saveData();
        renderMeals();
        renderWorkouts();
        updateStats();
    }
}

// Clear all data
function clearAll() {
    if (confirm('Do you really want to clear ALL data? This action cannot be undone!')) {
        localStorage.removeItem(STORAGE_KEY);
        data = { meals: [], workouts: [], history: [] };
        renderMeals();
        renderWorkouts();
        updateStats();
    }
}

// Event listeners
document.getElementById('meal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('meal-name').value;
    const calories = document.getElementById('meal-calories').value;
    const time = document.getElementById('meal-time').value;
    
    addMeal(name, calories, time);
    e.target.reset();
});

document.getElementById('workout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('workout-name').value;
    const duration = document.getElementById('workout-duration').value;
    const time = document.getElementById('workout-time').value;
    
    addWorkout(name, duration, time);
    e.target.reset();
});

document.getElementById('clear-today').addEventListener('click', clearToday);
document.getElementById('clear-all').addEventListener('click', clearAll);

// Set default time to now
function setDefaultTime() {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    document.getElementById('meal-time').value = timeString;
    document.getElementById('workout-time').value = timeString;
}

// Initialize
loadData();
renderMeals();
renderWorkouts();
updateStats();
setDefaultTime();
