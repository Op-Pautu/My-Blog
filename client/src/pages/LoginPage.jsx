export default function LoginPage() {
  return (
    <div>
      <form className='login'>
        <h1>Login</h1>
        <input type='text' name='username' placeholder='Username' />
        <input type='password' name='password' placeholder='password' />
        <button>Login</button>
      </form>
    </div>
  );
}
