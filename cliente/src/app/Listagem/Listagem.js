export default async function Listagem({servidor}) {
    await new Promise((resolve)=> setTimeout(resolve, 5000))
    return(
        <div>
             {servidor?.map((user, index)=>
             <p key={index}>{user.name}</p>
             )}
        </div>
    )
}