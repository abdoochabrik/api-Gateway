export function extractTokenFromHeader(t: any): string | undefined {
  const [type, token] = t.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
