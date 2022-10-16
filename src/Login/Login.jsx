import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login() {
    return (
        <div className="logBox">
            <div className='box'>
                <div className="leftBox">
                    <h1>ccnkls</h1>
                    <button type="button" class="btn btn-primary">Primary</button>
                </div>
                <div className="rightBox">
                    <div className='right'>
                        <h1>hsocsc</h1>
                        <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        
    )
}

export default Login;