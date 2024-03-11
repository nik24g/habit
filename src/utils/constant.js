const success = {
    SUCCESS: "success..",
    USER_CREATED: "User is created.",
    USER_LOGIN: "User is logged in.",
    LOGOUT_SUCCESS: "Logout successfully.",
    HABIT_CREATED: "Habit is created",
    HABIT_DELETED: "Habit is deleted",
    HABIT_UPDATED: "Habit is updated",

}
const error = {
    WRONG: "Something went wrong..",
    USER_ALREADY: "User is already found.",
    USER_NOT_FOUND: "User is not found.",
    WRONG_PASSWORD: "Wrong password",
    NO_JWT: "Token is not found",
    INVALID_JWT: "Invalid jwt token.",
    WRONG_WITH_JWT: "Something wrong with jwt.",
    ALREADY_HABIT: "This habbit is already found",
    NO_HABIT: "No habit found"
}

module.exports = { success, error};

//developed by Nitin Goswami