const urlParams = new URLSearchParams(window.location.search);
    const userAlreadyExists = urlParams.has('userExists');

    if (userAlreadyExists) {
      Swal.fire({
        icon: 'error',
        title: 'Error de registro',
        text: 'El usuario ya está registrado en el sistema.',
      });
    }