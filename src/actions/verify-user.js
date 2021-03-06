export const verifyUser = async (props, dispatch) => {     
  try {
    const userVerification = await fetch('http://localhost:4000/verify');
    const { error, isValid, user } = await userVerification.json();
 
    if (error || !isValid) {
      dispatch({ 
        type: 'SET_GLOBAL_MESSAGE', 
        payload: { text: 'You must log in', type: 'error' },
      });

      props.history.push('/login');
    } else {
      dispatch({ type: 'SET_USER', payload: user });
    }
  } catch (error) {
    dispatch({ 
      type: 'SET_GLOBAL_MESSAGE', 
      payload: { text: error.message, type: 'error' },
    });
    
    props.history.push('/login');
  }
};