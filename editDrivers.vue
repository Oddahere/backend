<script>
import FooterComponent from '../components/footerComponent.vue';
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API;

export default {
  name: 'ContactUs',
  /*setup() {
    //validators
    return { v$: useVuelidate({ $autoDirty: true }) }
  },*/
  data() {
    return {
    DriversArray: [],
      driver: {
        fname: '',
        lname: '',
        emp_id: '',
        phone: '',
        hiring_date: '',
        loading: false,
        error: null
      }
    }
  },
  created() {
    //fetch services that have active status
    axios.get(`${apiURL}/services/search?val=true&searchBy=status`).then((res) => {
      this.services = res.data
      this.services.forEach((e) => {
        axios.get(`${apiURL}/services/id/${e._id}`).then((res) => {
          this.OrdersArray.push(res.data)
        })
      })
    })
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
          .post(`${apiURL}/order`, this.order)
          .then(() => {
            alert('Order has been added.')
            this.$router.push({ name: 'findevents' })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  },
  validations() {
    return {
      event: {
        name: { required },
        date: { required }
      }
    }
  },
  name: 'Drivers',
  components: {
    FooterComponent
  }
}
</script>

<template>
  <div class="page-container">

    <div class="search-order">
      <div class="flex flex-col">
        <label class="block">
          <input type="text"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="name" v-on:keyup.enter="handleSubmitForm" placeholder="Enter employee ID" />
        </label>
        <button @click="handleSubmitForm" class="custom-button">
          Search
        </button>
      </div>
  </div>

    <div class="dblist">
          <main>
            <div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                <div class="ml-10"></div>
                <div class="flex flex-col col-span-2">
                  <table class="min-w-full shadow-md rounded">
                    <thead style="background-color: #6aa9e5;" class="text-xl">
                      <tr class="p-4 text-left" style="background-color: #c0d9f0;">
                        <th class="p-4 text-left">First Name</th>
                        <th class="p-4 text-left">Last Name</th>
                        <th class="p-4 text-left">Employee ID</th>
                        <th class="p-4 text-left">Phone Number</th>
                        <th class="p-4 text-left">Hiring Date</th>
                        <th class="p-4 text-left">Comments</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-300" >
                      <!--<tr @click="editEvent(event._id)" v-for="event in recentEvents" :key="event._id">
                        <td class="p-2 text-left">{{ event.}}</td>
                        <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                        <td class="p-2 text-left">{{ event.}}</td>
                        <td class="p-2 text-left">{{ event.}}</td>
                        <td class="p-2 text-left">{{ event.}}</td>
                        <td class="p-2 text-left">{{ event.}}</td>
                      </tr>-->
                    </tbody>
                  </table>
                  <div>
                    <!--add &&!error back-->
                    <!-- Start of loading animation -->
                    <div class="mt-40" v-if="loading">
                      <p class="text-6xl font-bold text-center text-gray-500 animate-pulse">
                        Loading...
                      </p>
                    </div>
                    <!-- End of loading animation -->

                    <!-- Start of error alert -->
                    <div class="mt-12 bg-red-50" v-if="error">
                      <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                        {{ error.title }}
                      </h3>
                      <p class="p-4 text-lg font-bold text-red-900">
                        {{ error.message }}
                      </p>
                    </div>
                    <!-- End of error alert -->
                  </div>
                </div>
              </div>
            </div>
          </main>
    </div>
  </div>
      <footer>
        <FooterComponent />
      </footer>
</template>
  
<style>
  html, body {
    background-color: #ECF4FC;
    } 
  body {
      color: #002385;
      font-size: 14px;
    }
  h1, h2, h3 {
      color: #002385;
      font-size: 16px;
      font-family: 'Courier New', Courier, monospace;
      margin-top: 25px;
      font-weight: bold;
    }
  .page-container {
    display: flex;
  }
  .dblist {
      display: flex;
      min-height: 50vh;
      flex: 1;
  }
  .contentpage {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
    }
  .form-container {
      width: 640px;
      height: 1435px;
    }
  label {
      font-family: 'Courier New', Courier, monospace;
      font-size: 16px;
    }

  form {
      width: 500px;
      padding-bottom: 100px;
      padding-top: 5px;
    }
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="number"],
    input[type="date"],
    textarea {
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
      padding: 10px;
      border: 2px solid #6aa9e5;
      background-color: #c0d9f0;
      color: #002385;
      border-radius: 2%;
      color: #002385;
      margin-bottom: 10px;
    }

    input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    background-clip: content-box;
    border: 2px solid #6aa9e5;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-right: 5px;
    cursor: pointer;
    }

    input[type="checkbox"]:checked {
    background-color: #6aa9e5;
    }

    label.checkbox-label {
    font-family: "Courier New", Courier, monospace;
    color: #002385;
    }

    .confirmation-message {
    margin-top: 10px;
    padding: 10px;
    background-color: #61af67;
    color: #ffffff;
    border-radius: 4px;
    text-align: center;
    width: 500px;
    height: 30;
    }

    button[type="submit"] {
    background-color: #6aa9e5;
    color: #002385;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    }

    button[type="submit"]:hover {
      background-color: #4187c9;
    }

    .custom-select {
    font-family: "Courier New", Courier, monospace;
    font-size: 14px;
    color: #ffffff;
    background-color: #6aa9e5;
    border: 2px solid #c0d9f0;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    width: 230px;
    }

    option:disabled {
    color: #212121;
    }

    .radio {
      margin-right: 10px;
      padding-left: 5px;
      font-size: 16px;
      color: rgb(255, 255, 255);
    }
    label.radio {
      font-family: "Courier New", Courier, monospace;
      color: #002385; 
      font-weight: bold;
    }

    .form-container {
      display: flex;
      height: 50px;
      padding-right: 100px;
    }

    .form-group {
      margin-right: 5px;
    }

</style>