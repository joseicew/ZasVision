//Al inicializar el programa cogeremos los datos del usuario para guardarlos en la Variable User.
this.authService.getUsers().subscribe(data => {
    //primero rescatamos todos los usuarios y vamos a coger el último creado "size-1" para comprobar si es un nuevo usuario sin uid asignado.
    let size = Object.keys(data).length;
    console.log(data[Object.keys(data)[0]]);
    //console.log(size-1);
    this.authService.getUser(Object.keys(data)[size-1]).subscribe(user_ => {
      console.log(user_);
      this.user = user_;
      //Local Storage
      localStorage.setItem('LocalUser', JSON.stringify(this.user));

      //Al entrar cualquier usuario lo cazamos para comprobar si tiene o no uid asignado.
      firebase.auth().onAuthStateChanged(getuser => {
        if (getuser) {
          
          //si el uid es por defecto "none" le añadimos el propio que tiene en uid
          if (this.user.uid=='none'){
            this.user.uid = getuser.uid;
            //startup all vars
            this.user.pass = '';
            
            
            //Lo actualizamos
            this.authService
              .actualizarUser(this.user, Object.keys(data)[size-1])
              .subscribe(updateUser => {
                //console.log(updateUser);
              }),
              error => console.error(error);
          }else{
            for(let i=0;i<size;i++){
              if (data[Object.keys(data)[i]].uid == getuser.uid){
                this.user = data[Object.keys(data)[i]];
              }
            }
            //console.log(this.user);
          }
        }
      });
    });
  });