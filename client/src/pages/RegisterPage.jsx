export default function RegisterPage() {
  return (
    <div>
      <form className='register'>
        <h1>Register</h1>
        <input type='text' name='username' placeholder='Username' />
        <input type='password' name='password' placeholder='password' />
        <button>Register</button>
      </form>
    </div>
  );
}
