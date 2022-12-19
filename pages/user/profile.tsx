import type { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { getServerSession } from "../../src/auth/getServerSession";
import * as userRepository from "../../src/user/userRepository";

type ProfilePageProps = {
  user: userRepository.User;
};

export default function ProfilePage({
  user: { id, name, surname, email },
}: ProfilePageProps) {
  const {data: session,status:sessionStatus} = useSession()

  if(session){
  return (
    <div className="profile-page">
      <div className="profile-view">
        <h2>Profile {name}</h2>
        <div className="profile-item">
          <strong>ID:</strong> {id}
        </div>
        <div className="profile-item">
          <strong>Name:</strong> {name} {surname}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {email}
        </div>
      </div>
      <style jsx>{`
        .profile-page {
          margin-top: 32px;
        }

        .profile-view {
          margin: 16px 0;
        }

        .profile-item {
          padding-top: 8px;
        }

      `}</style>
    </div>
  );
}
else{
  return (
    <div className="signin-container">
      <div className="signin-message">Not signed in </div>
      <br/>
      <button className="signin-button" onClick={() => signIn()}>Sign in</button>
      <Link className='menuItem' href = {`/signup`}><button className="signup-button">Sign Up</button></Link>
      <style jsx>{`
      .signin-container{
          justify-content: center;
          text-align: center;
          justify-items: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          font-size:2.5rem;
          size:50%;
        }
        .sign-buttons{
          display: flex;
          flex-direction: row;
          justify-content: center;
          text-align: center;
          justify-items: center;
          padding:20px;
        }

          .signin-button{
            size:50%;
            text-align:center;
            justify-content:center;
            font-size:2.5rem;
            margin-left:20px;
          }
          .signup-button{
            size:50%;
            text-align:center;
            justify-content:center;
            font-size:2.5rem;
            margin-left:20px;
            background-color:#099bc0;
          }

          button:hover{
            cursor:pointer;
          }

          .signup-button:hover{

            background-color:#056077;
          }

      `}</style>
    </div>
  )
}
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  req,
  res,
}) => {
  const session = await getServerSession(req, res);
  const user = (await userRepository.findById(session?.user.userId as string, {
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
    },
  })) as userRepository.User;
  return { props: { user } };
};