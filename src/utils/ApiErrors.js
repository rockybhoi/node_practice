export function handleErrorResponse(res, errorMessage, statusCode) {
    if (res.headerSent) {
       return;
    } 
    const response = {
        success: false,
        message: errorMessage || 'An error occurred',
        statusCode: statusCode || 500
    }
    return res.status(statusCode).json(response);
}