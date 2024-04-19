<template>
  <div class="filter-section" v-if="user">
    <div class="filter-header">
      <h2>Filter</h2>
      <button class="clear-btn" @click="clearFilters">Clear All</button>
    </div>

    <div class="filter-group">
      <label for="min-cashback">Minimum Cashback</label>
      <div class="slider-value">{{ formattedMinCashback }}</div>
      <input
        type="range"
        id="min-cashback"
        v-model.number="minCashback"
        min="0"
        max="10"
        step="0.1"
        @input="emitFilter"
      />
      <div class="range-labels">
        <span>0%</span>
        <span>5%</span>
        <span>10%</span>
      </div>
    </div>

    <div class="filter-group">
      <label for="max-annual-fee">Max Annual Fee</label>
      <div class="slider-value">{{ formattedMaxAnnualFee }}</div>
      <input
        type="range"
        id="max-annual-fee"
        v-model.number="maxAnnualFee"
        min="0"
        max="1000"
        step="50"
        @input="emitFilter"
      />
      <div class="range-labels">
        <span>$0</span>
        <span>$500</span>
        <span>$1000</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  data() {
    return {
      user: false,
      minCashback: 0,
      maxAnnualFee: 1000,
    };
  },
  computed: {
    formattedMinCashback() {
      return `${this.minCashback}%`;
    },
    formattedMaxAnnualFee() {
      return `$${this.maxAnnualFee}`;
    },
  },
  methods: {
    clearFilters() {
      this.minCashback = 0;
      this.maxAnnualFee = 1000;
      this.emitFilter();
    },
    emitFilter() {
      // Emit an 'update-filter' event with the current filter values
      this.$emit("update-filter", {
        minCashback: this.minCashback,
        maxAnnualFee: this.maxAnnualFee,
      });
    },
  },
};
</script>

<style scoped>
.filter-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.clear-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

.filter-group input[type="text"] {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  margin-bottom: 8px;
}

.filter-group input[type="range"] {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #dee2e6;
  outline: none;
}

.filter-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
}

.filter-group input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
}

.range-labels {
  display: flex;
  justify-content: space-between;
}

.range-labels span {
  color: #6c757d;
  font-size: 0.9rem;
}
</style>
