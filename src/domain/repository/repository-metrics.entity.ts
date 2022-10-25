export interface RepositoryMetricsEntity {
  id: string;
  name: string;
  tribe: string;
  organization: string;
  coverage: string; //: "35%"
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  hostpots: number;
  verificationState: string; // Estado de verificación (Mock)
  state: string; // Estado del repositorio (state)
}
