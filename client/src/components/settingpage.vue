
<template>
  <div class="p-5">
    <div class="container">
      <div class="container border-top border-left border-right p-3 mx-1">
        <center class="col-12 my-3">
          <div class="col-12">
            <div class="row my-1 justify-content-center">
              <img
                class="img-thumbnail rounded-circle"
                height="140"
                width="140"
                v-bind:src="loggedInUser.picture"
                style="max-height: 140px; max-width: 140px;"
              >
            </div>
            <div class="row my-3 justify-content-center">
              <div class="col-12">
                <h5>{{ loggedInUser.name }}</h5>
                <small class="text-muted my-3">user ID : {{ loggedInUser._id }}</small>
                <p class="my-1">
                  <b>{{ loggedInUser.email }}</b>
                </p>
              </div>
            </div>
          </div>
        </center>
      </div>
      <div class="container border-bottom border-left border-right p-3 mx-1">
        <div class="col-12 my-3">
          <form class="my-3" @submit.prevent="updateAccount">
            <div class="form-group">
              <label for="changeName">Change Name</label>
              <input
                v-model="userChange.name"
                type="text"
                class="form-control"
                id="changeName"
                placeholder="Name"
              >
            </div>
            <div class="form-group">
              <label for="changePassword">Change Password</label>
              <input
                v-model="userChange.password"
                type="password"
                class="form-control"
                id="changePassword"
                placeholder="Password"
              >
            </div>
            <div class="form-group">
              <label for="selectedPicture">Profile Picture</label>
              <input
                @change="selectProfilePic"
                id="selectedPicture"
                type="file"
                class="form-control-file"
                placeholder="Profile Picture"
              >
            </div>
            <center class="mt-5 my-3">
              <button type="submit" class="btn btn-lg btn-primary mx-2">Update Your Account Detail</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ax"],
  data() {
    return {
      loggedInUser: {},
      userChange: {}
    };
  },
  created() {
    this.loggedInUser = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {},
  methods: {
    // USER RELATED FUNCTION
    updateAccount() {
      if (
        !this.userChange.name &&
        !this.userChange.password &&
        !this.userChange.picture
      ) {
      } else {
        swal({
          title: "Confirmation",
          text: "Update your account detail?",
          icon: "info",
          buttons: true,
          dangerMode: true
        }).then(confirm => {
          if (confirm) {
            var passwordValid = true;
            var updValue = {};
            if (this.userChange.name) {
              if (
                this.userChange.name == this.loggedInUser.name ||
                this.userChange.name == ""
              ) {
                updValue.name = this.loggedInUser.name;
              } else {
                updValue.name = this.userChange.name;
              }
            }
            if (this.userChange.password) {
              if (this.userChange.password !== "") {
                if (
                  this.userChange.password.length < 8 ||
                  this.userChange.password.length > 16
                ) {
                  passwordValid = false;
                }
                updValue.password = this.userChange.password;
              }
            }
            if (this.userChange.picture) {
              updValue.picture = this.userChange.picture;
            }

            if (updValue.picture) {
              const blob = new Blob([this.userChange.picture], {
                type: this.userChange.picture.type
              });

              const formdata = new FormData();
              formdata.append("image", blob);
              this.ax({
                method: "POST",
                url: "/uploadimg",
                data: formdata,
                headers: {
                  "Content-Type": "multipart/form-data",
                  token: localStorage.getItem("token")
                }
              })
                .then(({ data }) => {
                  this.userChange.picture = data;
                  updValue.picture = data;
                  return this.ax({
                    method: "PATCH",
                    url: "/users",
                    data: updValue
                  });
                })
                .then(({ data }) => {
                  let { name, picture } = this.userChange;
                  if (name) {
                    this.loggedInUser.name = name;
                  }
                  if (picture) {
                    this.loggedInUser.picture = picture;
                  }
                  $("#selectedPicture").val("");
                  localStorage.setItem(
                    "user",
                    JSON.stringify(this.loggedInUser)
                  );
                  this.userChange = {};
                  this.checkUser();
                  swal("Success", "Your account has been updated", "success");
                })
                .catch(err => {
                  if (err.response.data.message) {
                    swal("Sorry", err.response.data.message, "error");
                  } else {
                    swal("Sorry", "Problem occured, try again later", "error");
                  }
                  console.log(err);
                  console.log(
                    "error update akun dengan upload gambar",
                    JSON.stringify(err, null, 2)
                  );
                });
            } else if (updValue.password && passwordValid == false) {
              swal(
                "Attention",
                "Password should consist of 8-16 character",
                "info"
              );
            } else {
              if (updValue.name == "" || updValue.password == "") {
                swal("Fill one of the field that you want to update!");
              } else {
                this.ax({
                  method: "PATCH",
                  url: "/users",
                  data: updValue
                })
                  .then(({ data }) => {
                    let { name } = this.userChange;
                    if (name) {
                      this.loggedInUser.name = name;
                    }
                    localStorage.setItem(
                      "user",
                      JSON.stringify(this.loggedInUser)
                    );
                    this.userChange = {};
                    this.checkUser();
                    swal("Success", "Your account has been updated", "success");
                  })
                  .catch(err => {
                    if (err.response.data.message) {
                      swal("Sorry", err.response.data.message, "error");
                    } else {
                      swal(
                        "Sorry",
                        "Problem occured, try again later",
                        "error"
                      );
                    }
                    console.log(err);
                    console.log(
                      "error update akun tanpa upload gambar",
                      JSON.stringify(err, null, 2)
                    );
                  });
              }
            }
          }
        });
      }
    },
    // UPLOAD PICTURE FUNCTION
    selectProfilePic(event) {
      this.userChange.picture = event.target.files[0];
    }
  }
};
</script>
