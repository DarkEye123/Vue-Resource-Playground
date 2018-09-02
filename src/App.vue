<template>
  <div id="app">
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-md-2 col-md-6 offset-md-3 ">
        <div class="form-group">
          <label>User Name</label>
          <input type="text" class="form-control" placeholder="Your User Name Here" v-model="user.username">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-md-2 col-md-6 offset-md-3 ">
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" placeholder="Your Email Here" v-model="user.email">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-md-2 col-md-6 offset-md-3 ">
        <div class="btn btn-primary mr-2" @click=submitHttp>Submit via http</div>
        <div class="btn btn-primary mr-2" @click=submitSave>Submit via resource save</div>
        <div class="btn btn-primary mr-2" @click=submitCustom>Submit via customized resource</div>
      </div>
    </div>
    <hr>
    <div class="row mb-1">
      <div class="col-xs-12 col-sm-8 offset-md-2 col-md-6 offset-md-3 ">
        <div class="btn btn-primary" @click=fetch>Fetch Users</div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-8 offset-md-2 col-md-6 offset-md-3 ">
        <ul class="list-group">
          <li class="list-group-item" v-for="(fUser, index) in users" :key="index">{{fUser.username}} - {{fUser.email}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: ""
      },
      users: [],
      resource: {}
    };
  },
  methods: {
    submitHttp() {
      console.log(this.user);
      // added via VueResource global import
      // post returns promise, therefore .then is possible
      this.$http
        .post("users.json", this.user)
        .then(response => console.log(response));
    },
    submitSave() {
      console.log(this.user);
      this.resource.save({}, this.user); // returns promise
    },
    submitCustom() {
      this.resource.customizedPost(this.user);
    },
    fetch() {
      this.$http
        .get("users.json")
        .then(response => {
          console.log(response);
          return response.json(); //this is promise too
        })
        .then(data => {
          let users = [];
          console.log(data);
          for (let key in data) {
            console.log(key);
            users.push(data[key]);
          }
          this.users = users;
        });
    }
  },
  created() {
    const customActions = {
      customizedPost: { method: "POST", url: "customized.json" }
    };
    this.resource = this.$resource("users.json", {}, customActions);
  }
};
</script>

