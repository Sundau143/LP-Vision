import React from "react";
import { checkSuperuser } from "../hooks/user.actions";
import ForbiddenPage from "../pages/errorPages/Forbidden";

function AdminRoute({ children }) {
    const isSuperuser = checkSuperuser();

    return isSuperuser ? <>{children}</> :<ForbiddenPage></ForbiddenPage>;
}

export default AdminRoute;