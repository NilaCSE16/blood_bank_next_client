"use client";
import React from "react";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="my-10">
      <div>
        <div>
          <h1 className="text-3xl my-2">
            Welcome Admin{" "}
            <i className="text-green-600 font-bold">{user?.name}</i>
          </h1>
          <h3 className="text-xl my-1">Manage Blood Bank App</h3>
          <hr className="border-gray-400 my-3" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic,
            eligendi quos! Consequatur nobis cum ad sapiente quos adipisci
            facere aspernatur voluptatibus cupiditate deleniti quas eveniet
            ducimus tempore repellendus expedita distinctio vitae perspiciatis,
            ipsam voluptatem magni, neque et. Earum beatae necessitatibus minima
            ab cumque id optio eius provident! Ipsa magni commodi praesentium,
            error enim sed exercitationem tenetur, porro nostrum consequatur
            numquam delectus et quasi quo in ipsam tempora. Accusamus doloribus
            nihil corporis debitis a aut minus cumque rem eius soluta qui autem
            aliquid ipsum quae maiores earum in, consequuntur explicabo ipsa
            facilis amet quas iure blanditiis. Possimus eos similique at ipsa
            cupiditate. Error optio expedita libero, consectetur reiciendis nemo
            quo nisi obcaecati, saepe delectus explicabo animi, modi sit.
            Temporibus officiis enim assumenda dolor eum facere illo culpa
            eligendi distinctio ex veniam asperiores, accusantium illum eaque
            incidunt quod eveniet esse. Praesentium sunt facere, vitae ab nam
            enim nihil eum sint, consequuntur minima, beatae molestias
            voluptatem. Sunt excepturi consequatur sit aperiam repellendus
            temporibus sint quae nam tempora, in amet magnam sed? Eius, debitis
            distinctio. Veniam minima similique porro necessitatibus quam totam
            nemo aspernatur repellat quaerat fugiat laboriosam, distinctio
            excepturi sunt hic explicabo laudantium molestias velit ducimus
            ipsum esse ea magnam? Nisi, rem aspernatur?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
