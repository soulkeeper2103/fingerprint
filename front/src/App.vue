<template>
    <div>
        <b>Ваш уникальный ID - {{id}}</b>
        <br>
        <b>{{torText}}</b>
        <br>
        Данные, деанонимизоравашие вас:
        <br><br>
        <br>
            <b>Number of cpus</b> - {{data.cpus}}
        <br>
                <b>Languages</b> - {{data.languages}}
        <br>
                    <b>res Y</b> -  {{data.winy}}
        <br>
                        <b>res X</b> - {{data.winx}}
        <br>
                                        <b>webgl</b> - {{data.webgl}}
        <br>
                                            <b>colordepth</b> - {{data.colordepth}}
        <br>
    </div>
</template>

<script>
    const pi = require("public-ip")
    const Fingerprint2 = require('fingerprintjs2')
    const axios = require('axios');
export default {
  name: 'App',
  components: {
  },
    data()
    {
      return{
            id: "",
          data: "",
          torText: ""
      }
    },
  beforeMount() {
      let ip;
      pi.v4().then(res => {
          ip = res
          let c;
          Fingerprint2.get(components => {
              console.log(components)
              c = components
              c[19].value.splice(22, 2)
              c[19].value.splice(23, 4)
              c[19].value.splice(0, 2)
              this.data = {
                  cpus: navigator.hardwareConcurrency,
                  languages: c[2].value,
                  winy: window.screen.availHeight,
                  winx: window.screen.availWidth,
                  webgl: c[19].value,
                  colordepth: c[3].value,
                  ip: ip
              };
              console.log(this.data)
              axios({
                  method: "POST",
                  url: "/check",
                  data: {
                      data: this.data
                  }

              })
                  .then(response => {
                      this.id = response.data[0].id_user
                      if (response.data[1] == true) this.torText = "ОБНАРУЖЕН TOR"
                      else this.torText = "TOR не обнаружен"
                  })
                  .catch(error => console.log(error));
          })
      })
  }
}
</script>

