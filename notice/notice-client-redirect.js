const msgList = {
    user_activation: 'User activated successfully',
    user_activation_fault: 'User was not activated',
    user_password_changed: 'User password was changed successfully',
    user_password_changed_fault: 'User password was not changed',
}

module.exports = (res, msgKey) =>res.redirect(`${process.env.CLIENT_URL}/?apiMsg=${msgList?.[msgKey] ?? msgKey}`);
