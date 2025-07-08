-- Crear cupones de referidos si no existen
INSERT INTO cupones (codigo, tipo_descuento, valor, fecha_inicio, fecha_fin, max_uso, usado, activo, "createdAt", "updatedAt")
VALUES 
  ('REFERIDO30', 'soles', 30.00, '2025-01-01', '2025-12-31', 1, 0, true, NOW(), NOW()),
  ('REFERIR50', 'soles', 50.00, '2025-01-01', '2025-12-31', 1, 0, true, NOW(), NOW())
ON CONFLICT (codigo) DO NOTHING;