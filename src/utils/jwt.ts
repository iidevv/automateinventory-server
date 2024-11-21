import jwt from 'jsonwebtoken';

export const signToken = (user: { id: string; email: string }): string => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || '',
        { expiresIn: '1h' }
    );
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || '');
    } catch (err) {
        return null;
    }
};
