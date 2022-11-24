import "./AdmTableUsers.scss"
import {useState} from "react";


const AdmTableUsers = ({users, updateUsers}) => {
  const [isPopUpVisible, setPopUpVisible] = useState(false)
  const token = localStorage.getItem("authToken");
  const [clientError, setClientErr] = useState("")
  const [currentUser, setCurrentUser] = useState()

  const dellUsers = async id => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        updateUsers();
      }, (errServer) => {
        console.log(errServer);
      })
  }

  function preEditFlight(item) {
    setPopUpVisible(true)
    setCurrentUser(item);
  }

  function getStringRoles() {
    let answer = [];
    let elements = document.getElementsByClassName("form-check-input")
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].checked) answer.push(elements[i].value)
    }
    return answer.join(" ")
  }

  async function editAirline() {
    const token = localStorage.getItem("authToken")

    await fetch(`http://localhost:3000/users/${currentUser?.login}`, {
      method: 'PUT',
      body: JSON.stringify({
        roles: getStringRoles(),
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
          if (result?.message) return setClientErr(result.message)
          setPopUpVisible(false)
          updateUsers()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  function isUser(role) {
    return currentUser?.roles.split(" ").includes(role);
  }

  const resUsers = users?.map(item => {
    return (
      <tr key={item.login}>
        <td>{item.login}</td>
        <td>{item.roles}</td>
        <td>
          <button onClick={() => preEditFlight(item)} className="btn_edit">Edit</button>
        </td>
        <td>
          <button onClick={() => dellUsers(item.login)} className="btn_edit btnRed">Delete</button>
        </td>
      </tr>
    )
  })


  return (
    <>
      <table className="tableAdm" >
        <thead>
        <tr>
          <th className="nameTable">Пользователи</th>
          <th>Роли</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {resUsers}
        </tbody>
      </table>
      {isPopUpVisible && (
        <div className="popUpEditFlight">
          <div className="content">
            <form>
              <div className="topLineForm">
                <p><b>Изменение ролей {currentUser?.login}</b></p>
                <button onClick={() => {
                  setPopUpVisible(false);
                  setClientErr("")
                }} className="closeButton">X
                </button>
              </div>
              <div className="form-check">
                <input className="form-check-input"
                       type="checkbox" value={"passenger"} id="checkPassenger" defaultChecked={isUser("passenger")}/>
                <label className="form-check-label" htmlFor="checkPassenger">
                  passenger
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       value={"crew"} id="checkCrew"
                       defaultChecked={isUser("crew")}/>
                <label className="form-check-label" htmlFor="checkCrew">
                  crew
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"
                       value={"admin"} id="checkAdmin"
                       defaultChecked={isUser("admin")}/>
                <label className="form-check-label" htmlFor="checkAdmin">
                  admin
                </label>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <button onClick={(e) => {
                    e.preventDefault();
                    editAirline()
                  }} className="btn_form">Сохранить
                  </button>
                </div>
                {(clientError) && <p className="form-group col-md-6 textError">{clientError}</p>}
              </div>
            </form>
          </div>
        </div>)
      }
    </>
  )
}

export default AdmTableUsers
