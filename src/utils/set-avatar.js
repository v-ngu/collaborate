const setAvatar = (firstName, lastName) => {
  const initials = firstName.charAt(0) + lastName.charAt(0);

  return ({
    sx: { bgcolor: "#FF5821"},
    children: initials.toUpperCase()
  })
};

export default setAvatar;