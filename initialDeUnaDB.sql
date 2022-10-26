-- ----------------------------
-- Table structure for metrics
-- ----------------------------
CREATE TABLE "public"."metrics" (
  "id_repository" uuid NOT NULL,
  "coverage" float4 NOT NULL,
  "vulnerabilities" int4 NOT NULL,
  "hostpot" int4 NOT NULL,
  "code_smells" int4 NOT NULL,
  "bugs" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of metrics
-- ----------------------------
INSERT INTO "public"."metrics" VALUES ('76174412-0b27-4420-87a1-dfd6e4650bd6', 80, 0, 0, 0, 0);
INSERT INTO "public"."metrics" VALUES ('b579f126-2272-4114-a1a1-f051ad775634', 90, 0, 0, 0, 0);
INSERT INTO "public"."metrics" VALUES ('96c3d8d0-ba51-4fb6-855b-c14800ae7bf2', 76, 0, 1, 0, 1);

-- ----------------------------
-- Table structure for organization
-- ----------------------------
CREATE TABLE "public"."organization" (
  "id_organization" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "status" int4 NOT NULL
)
;

-- ----------------------------
-- Records of organization
-- ----------------------------
INSERT INTO "public"."organization" VALUES ('bc30ed54-c7bc-4518-b265-800d500d5515', 'Banco de Machala', 1);
INSERT INTO "public"."organization" VALUES ('3017c705-3ca0-4b59-b842-b4e986bf063e', 'Banco Pichincha', 1);
INSERT INTO "public"."organization" VALUES ('6e1bd39b-2348-4f5a-b529-0a2e94c7968a', 'Banco de Loja', 1);

-- ----------------------------
-- Table structure for repository
-- ----------------------------
CREATE TABLE "public"."repository" (
  "id_repository" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "state" varchar(1) NOT NULL,
  "create_time" timestamp(6) NOT NULL,
  "status" varchar(1) COLLATE "pg_catalog"."default",
  "id_tribe" uuid NOT NULL
)
;

-- ----------------------------
-- Records of repository
-- ----------------------------
INSERT INTO "public"."repository" VALUES ('76174412-0b27-4420-87a1-dfd6e4650bd6', 'predator 1', 'E', '2022-10-25 10:47:30', 'A', 'ebd6b40e-d629-4771-87db-1043a32149d4');
INSERT INTO "public"."repository" VALUES ('b579f126-2272-4114-a1a1-f051ad775634', 'covenant', 'E', '2022-10-25 10:48:09', 'A', '78d1d3af-f8e8-49a4-8084-f7f8ec9b31ac');
INSERT INTO "public"."repository" VALUES ('96c3d8d0-ba51-4fb6-855b-c14800ae7bf2', 'prometeo', 'E', '2022-10-25 11:10:52', 'A', '78d1d3af-f8e8-49a4-8084-f7f8ec9b31ac');

-- ----------------------------
-- Table structure for tribe
-- ----------------------------
CREATE TABLE "public"."tribe" (
  "id_tribe" uuid NOT NULL,
  "id_organization" uuid NOT NULL,
  "name" varchar(50) NOT NULL,
  "status" int4 NOT NULL
)
;

-- ----------------------------
-- Records of tribe
-- ----------------------------
INSERT INTO "public"."tribe" VALUES ('ebd6b40e-d629-4771-87db-1043a32149d4', 'bc30ed54-c7bc-4518-b265-800d500d5515', 'Predators', 1);
INSERT INTO "public"."tribe" VALUES ('78d1d3af-f8e8-49a4-8084-f7f8ec9b31ac', '3017c705-3ca0-4b59-b842-b4e986bf063e', 'Aliens', 1);

-- ----------------------------
-- Primary Key structure for table metrics
-- ----------------------------
ALTER TABLE "public"."metrics" ADD CONSTRAINT "metrics_pkey" PRIMARY KEY ("id_repository");

-- ----------------------------
-- Primary Key structure for table organization
-- ----------------------------
ALTER TABLE "public"."organization" ADD CONSTRAINT "organization_pkey" PRIMARY KEY ("id_organization");

-- ----------------------------
-- Primary Key structure for table repository
-- ----------------------------
ALTER TABLE "public"."repository" ADD CONSTRAINT "repository_pkey" PRIMARY KEY ("id_repository");

-- ----------------------------
-- Primary Key structure for table tribe
-- ----------------------------
ALTER TABLE "public"."tribe" ADD CONSTRAINT "tribe_pkey" PRIMARY KEY ("id_tribe");

-- ----------------------------
-- Foreign Keys structure for table metrics
-- ----------------------------
ALTER TABLE "public"."metrics" ADD CONSTRAINT "metrics_fk_repository" FOREIGN KEY ("id_repository") REFERENCES "public"."repository" ("id_repository") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table repository
-- ----------------------------
ALTER TABLE "public"."repository" ADD CONSTRAINT "repository_fk_tribe" FOREIGN KEY ("id_tribe") REFERENCES "public"."tribe" ("id_tribe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table tribe
-- ----------------------------
ALTER TABLE "public"."tribe" ADD CONSTRAINT "organization_fk_tribe" FOREIGN KEY ("id_organization") REFERENCES "public"."organization" ("id_organization") ON DELETE NO ACTION ON UPDATE NO ACTION;
